using Crozy.Domain.ExtraOptionCategories;
using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Moneys;

namespace Crozy.GraphQL.ExtraOptions;

public record UpdateExtraOptionInput(
    [property: ID(nameof(ExtraOption))] long Id,
    string Name,
    Money Price,
    [property: ID(nameof(ExtraOptionCategory))] long ExtraOptionCategoryId);