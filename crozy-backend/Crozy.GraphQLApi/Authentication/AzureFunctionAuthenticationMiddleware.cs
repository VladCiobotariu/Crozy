using System.Net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http.Features.Authentication;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Middleware;

namespace Crozy.GraphQLApi.Authentication
{
    public class AzureFunctionAuthenticationMiddleware : IFunctionsWorkerMiddleware
    {
        public AzureFunctionAuthenticationMiddleware(IAuthenticationSchemeProvider schemes)
        {
            Schemes = schemes;
        }

        public IAuthenticationSchemeProvider Schemes { get; }

        public async Task Invoke(FunctionContext context, FunctionExecutionDelegate next)
        {
            var httpContext = context.GetHttpContext();
            if(httpContext == null)
            {
                // The function is not processing an HTTP trigger. Execution can continue.
                await next(context);
                return;
            }
            
            // Add CORS headers to all responses
            var allowedOrigins = (Environment.GetEnvironmentVariable("Host__CORS") ?? "")
                .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            var requestOrigin = httpContext.Request.Headers["Origin"].FirstOrDefault();

            if (!string.IsNullOrEmpty(requestOrigin) && allowedOrigins.Contains(requestOrigin, StringComparer.OrdinalIgnoreCase))
            {
                httpContext.Response.Headers["Access-Control-Allow-Origin"] = requestOrigin;
                httpContext.Response.Headers["Vary"] = "Origin"; // Optional: informs caching proxies that this header varies
            }

            // CORS headers always needed
            httpContext.Response.Headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
            httpContext.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, organisation-id, deafault-organisation, graphql-preflight";
            httpContext.Response.Headers["Access-Control-Allow-Credentials"] = "true";

            // Handle OPTIONS request early and return 200
            if (httpContext.Request.Method.Equals("OPTIONS", StringComparison.OrdinalIgnoreCase))
            {
                httpContext.Response.StatusCode = (int)HttpStatusCode.OK;
                await httpContext.Response.CompleteAsync(); // Finalize response
                return;
            }

            httpContext.Features.Set<IAuthenticationFeature>(new AuthenticationFeature
            {
                OriginalPath = httpContext.Request.Path,
                OriginalPathBase = httpContext.Request.PathBase
            });

            // Give any IAuthenticationRequestHandler schemes a chance to handle the request
            var handlers = context.InstanceServices.GetRequiredService<IAuthenticationHandlerProvider>();
            foreach (var scheme in await Schemes.GetRequestHandlerSchemesAsync())
            {
                var handler = await handlers.GetHandlerAsync(httpContext, scheme.Name) as IAuthenticationRequestHandler;
                if (handler != null && await handler.HandleRequestAsync())
                {
                    return;
                }
            }
            
            var defaultAuthenticate = await Schemes.GetDefaultAuthenticateSchemeAsync();
            if (defaultAuthenticate != null)
            {
                var result = await httpContext.AuthenticateAsync(defaultAuthenticate.Name);
                if (result?.Principal != null)
                {
                    httpContext.User = result.Principal;
                }
                if (result?.Succeeded ?? false)
                {
                    var authFeatures = new AuthenticationFeatures(result);
                    httpContext.Features.Set<IHttpAuthenticationFeature>(authFeatures);
                    httpContext.Features.Set<IAuthenticateResultFeature>(authFeatures);
                }
            }

            await next(context);
        }
    }
}
