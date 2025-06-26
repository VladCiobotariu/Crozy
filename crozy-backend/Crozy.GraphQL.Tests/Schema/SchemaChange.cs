using Snapshooter.Xunit;

namespace Crozy.GraphQL.Tests.Schema;

public class SchemaChange
{
    [Fact]
    public async Task SchemaChangeTest()
    {
        var schema = await TestSchemaServices.ExecutorProxy.GetSchemaAsync(default);
        schema.ToString().MatchSnapshot();
    }
}