using Crozy.Domain.Sites;
using HotChocolate.Types.Relay;

namespace Crozy.GraphQL.Sites
{
    public record UpdateSiteInput(
        [property: ID(nameof(Site))] long Id,
        string Name,
        string Slug);
}
