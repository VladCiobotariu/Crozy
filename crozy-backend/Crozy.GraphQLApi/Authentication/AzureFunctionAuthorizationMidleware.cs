using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Organisations;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Functions.Worker.Middleware;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Microsoft.Identity.Web;
using System.Net;
using System.Security.Claims;
using HotChocolate.Types.Relay;

namespace Crozy.GraphQLApi.Authentication
{
    public class AzureFunctionAuthorizationMidleware : IFunctionsWorkerMiddleware
    {
        private readonly IIdSerializer serializer;
        private readonly ILogger<AzureFunctionAuthorizationMidleware> logger;

        public AzureFunctionAuthorizationMidleware(ILogger<AzureFunctionAuthorizationMidleware> logger, IIdSerializer serializer)
        {
            this.logger = logger;
            this.serializer = serializer;
        }
        public async Task Invoke(FunctionContext context, FunctionExecutionDelegate next)
        {

            var httpContext = context.GetHttpContext();

            // 0 - if not processing an HTTP trigger, nothing to do
            if (httpContext == null)
            {
                // The function is not processing an HTTP trigger. Execution can continue.
                await next(context);
                return;
            }

            // 1 - if the request is not authenticated, nothing to do
            if (httpContext.User.Identity == null || !httpContext.User.Identity.IsAuthenticated)
            {
                await next(context);
                return;
            }

            string? userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                await WriteAccessDeniedResponse($"User '{ClaimTypes.NameIdentifier}' claim is required", HttpStatusCode.Unauthorized, httpContext, context);
                await next(context);
                return;
            }

            Claim? scopeClaim = httpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimConstants.Scope);
            if (scopeClaim?.Value == Claims.Administration)
            {
                bool success = await TryBuildAdministrationClaims(userId, httpContext, context);
                if (success)
                {
                    await next(context);
                }
            }
            else if (scopeClaim?.Value == Claims.Shopping)
            {
                bool success = await TryBuildShoppingClaims(userId, httpContext, context);
                if (success)
                {
                    await next(context);
                }
            }
            else
            {
                await WriteAccessDeniedResponse($"{scopeClaim} is unknown scope", HttpStatusCode.Unauthorized, httpContext, context);
            }
        }

        private async Task<bool> TryBuildAdministrationClaims(string userId, HttpContext httpContext, FunctionContext context)
        {
            if (httpContext.Request.Headers[OrganisationsConst.DefaultOrganisation].SingleOrDefault() == "true")
            {
                return await TryBuildDefaultAdministrationClaims(userId, httpContext, context);
            }
            
            if (!httpContext.Request.Headers.TryGetValue(OrganisationsConst.OrganisationIdHeader, out StringValues tenantIdvalues))
            {
                await WriteAccessDeniedResponse($"{OrganisationsConst.OrganisationIdHeader} header is missing", HttpStatusCode.Unauthorized, httpContext, context);
                return false;
            }

            string? stringOrganisationId = tenantIdvalues.FirstOrDefault();
            if (string.IsNullOrEmpty(stringOrganisationId))
            {
                await WriteAccessDeniedResponse($"{OrganisationsConst.OrganisationIdHeader} header has no value", HttpStatusCode.Unauthorized, httpContext, context);
                return false;
            }
            
            IdValue deserializedIdValue;
            try
            {
                deserializedIdValue = serializer.Deserialize(stringOrganisationId); 
            }
            catch
            {
                await WriteAccessDeniedResponse($"Invalid {OrganisationsConst.OrganisationIdHeader} header provided", HttpStatusCode.Unauthorized, httpContext, context);
                return false;
            }
            
            if (!long.TryParse(deserializedIdValue.Value.ToString(), out long organisationId))
            {
                await WriteAccessDeniedResponse($"Invalid {OrganisationsConst.OrganisationIdHeader} header provided", HttpStatusCode.Unauthorized, httpContext, context);
                return false;
            }

            // 3 - Now we try to get the user permissions (as ClaimsIdentity)
            IPermissionService permissionService = GetPermissionService(context);
            ClaimsIdentity? permissionsIdentity = await permissionService.GetSellerPermissionsIdentityAsync(userId, organisationId);
            if (permissionsIdentity is null)
            {
                logger.LogWarning("User {userId} does not have permissions in organisation {organisation}", userId, organisationId);

                await WriteAccessDeniedResponse($"User '{ClaimTypes.NameIdentifier}' claim is required", HttpStatusCode.Forbidden, httpContext, context);
                return false;
            }

            // 4 - User has permissions
            // so we add the extra identity to the ClaimsPrincipal
            httpContext.User.AddIdentity(permissionsIdentity);
            return true;
        }

        private async Task<bool> TryBuildShoppingClaims(string userId, HttpContext httpContext, FunctionContext context)
        {
            // 3 - Now we try to get the user permissions (as ClaimsIdentity)
            IPermissionService permissionService = GetPermissionService(context);
            ClaimsIdentity? permissionsIdentity = await permissionService.GetBuyerPermissionsIdentityAsync(userId);
            if (permissionsIdentity is null)
            {
                logger.LogWarning("Buyer {userId} does not have permissions", userId);

                await WriteAccessDeniedResponse($"User '{ClaimTypes.NameIdentifier}' claim is required", HttpStatusCode.Unauthorized, httpContext, context);
                return false;
            }

            // 4 - User has permissions
            // so we add the extra identity to the ClaimsPrincipal
            httpContext.User.AddIdentity(permissionsIdentity);
            return true;
        }

        private async Task WriteAccessDeniedResponse(string message, HttpStatusCode statusCode, HttpContext httpContext, FunctionContext context)
        {
            var requestData = await context.GetHttpRequestDataAsync();

            if (requestData is not null)
            {
                var newResponse = requestData.CreateResponse();
                await newResponse.WriteAsJsonAsync(new { errors = new string[] { message } }, statusCode);

                // Update invocation result with the new http response.
                context.GetInvocationResult().Value = newResponse;
            }
        }

        private async Task<bool> TryBuildDefaultAdministrationClaims(string userId, HttpContext httpContext, FunctionContext context )
        {
            IPermissionService permissionService = GetPermissionService(context);
            ClaimsIdentity? defaultPermissionsIdentity =
                await permissionService.GetSellerPermissionsIdentityForDefaultOrganisationAsync(userId);
            if (defaultPermissionsIdentity is null)
            {
                logger.LogWarning("User {userId} does not exits", userId);
                await WriteAccessDeniedResponse($"Current user does not have access to any Organisations",
                    HttpStatusCode.Forbidden, httpContext, context);
                return false;
            }

            httpContext.User.AddIdentity(defaultPermissionsIdentity);
            return true;

        }

        private IPermissionService GetPermissionService(FunctionContext context) => context.InstanceServices.GetRequiredService<IPermissionService>();
    }
}
