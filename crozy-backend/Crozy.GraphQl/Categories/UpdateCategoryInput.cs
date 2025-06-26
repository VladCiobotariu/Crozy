using Crozy.Domain.Categories;

namespace Crozy.GraphQL.Categories
{
    public record UpdateCategoryInput(
        [property: ID(nameof(Category))] long Id,
        string Name,
        string Slug,
        int DisplayNumber,
        string? Description);
}
