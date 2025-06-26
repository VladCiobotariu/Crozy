using HotChocolate.AzureFunctions;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace Crozy.GraphQLApi;

public class GraphQLFunction
{
    private readonly IGraphQLRequestExecutor _executor;

    public GraphQLFunction(IGraphQLRequestExecutor executor)
    {
        _executor = executor;
    }

    [Function("GraphQLHttpFunction")]
    public Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "GraphQL/{**slug}")]
        HttpRequestData request)
    {
        return _executor.ExecuteAsync(request);
    }
}
