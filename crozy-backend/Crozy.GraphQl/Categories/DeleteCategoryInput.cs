using Crozy.Domain.Categories;

namespace Crozy.GraphQL.Categories
{
    public record DeleteCategoryInput([property: ID(nameof(Category))] long Id);
}
