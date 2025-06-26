using Crozy.Domain.Sites;
using HotChocolate.Types.Relay;

namespace Crozy.GraphQL.Sites
{
    public record DeleteSiteInput([property: ID(nameof(Site))] long Id);
    
}
