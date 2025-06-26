using Crozy.Domain.Categories;
using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Moneys;
using Crozy.Domain.Sites;
using HotChocolate.Types.Relay;

namespace Crozy.GraphQL.Products
{
    public record AddProductInput(
        [property: ID(nameof(Site))] long siteId,
        string name,
        decimal price,
        Currency currency,
        string? description,
        string slug,
        string? image,
        [property: ID(nameof(Category))] long[] categoryIds,
        [property: ID(nameof(ExtraOption))] long[] extraOptionIds);
}