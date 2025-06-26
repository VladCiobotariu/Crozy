using Crozy.Domain.ExtraOptionCategories;

namespace Crozy.GraphQL.ExtraOptionCategories;

public record UpdateExtraOptionCategoryInput(
    [property: ID(nameof(ExtraOptionCategory))] long Id,
    string Name);