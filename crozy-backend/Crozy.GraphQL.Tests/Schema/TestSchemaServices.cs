using Crozy.Infrastructure.Application.Extensions;
using HotChocolate;
using HotChocolate.Execution;
using Microsoft.Extensions.DependencyInjection;

namespace Crozy.GraphQL.Tests.Schema;

public static class TestSchemaServices
{
    static TestSchemaServices()
    {
        ServiceProvider = new ServiceCollection()
            .AddGraphQLServer()
            .AddCrozyGraphQL()
            .Services
            .AddSingleton(sp => new RequestExecutorProxy(
                sp.GetRequiredService<IRequestExecutorResolver>(),
                HotChocolate.Schema.DefaultName)
            ).BuildServiceProvider();

        ExecutorProxy = ServiceProvider.GetRequiredService<RequestExecutorProxy>();
    }
    
    public static IServiceProvider ServiceProvider { get; }
    
    public static RequestExecutorProxy ExecutorProxy { get; }

    public static async Task<string> ExecuteRequestAsync(
        Action<IQueryRequestBuilder> configureRequest,
        CancellationToken cancellationToken = default)
    {
        await using var scope = ServiceProvider.CreateAsyncScope();

        var requestBuilder = new QueryRequestBuilder();
        requestBuilder.SetServices(scope.ServiceProvider);
        configureRequest(requestBuilder);
        var request = requestBuilder.Create();

        await using var result = await ExecutorProxy.ExecuteAsync(request, cancellationToken);
        result.ExpectQueryResult();

        return result.ToJson();
    }
}