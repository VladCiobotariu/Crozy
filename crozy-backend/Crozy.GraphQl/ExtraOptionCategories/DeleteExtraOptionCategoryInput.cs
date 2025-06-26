using Crozy.Domain.ExtraOptionCategories;

namespace Crozy.GraphQL.ExtraOptionCategories;

public record DeleteExtraOptionCategoryInput([property: ID(nameof(ExtraOptionCategory))] long Id);