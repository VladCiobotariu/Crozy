using Crozy.Domain.Categories;
using Crozy.Domain.ExtraOptionCategories;
using Crozy.Domain.Moneys;

namespace Crozy.GraphQL.ExtraOptions
{
    public record class AddExtraOptionInput(
        string Name,
        Money Price,
        [property: ID(nameof(ExtraOptionCategory))] long ExtraOptionCategoryId);
}