using Crozy.Domain.ExtraOptionCategories;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.ExtraOptionCategories;

public class ExtraOptionCategoryByIdPayload : ExtraOptionCategoryPayloadBase
{
    public ExtraOptionCategoryByIdPayload(ExtraOptionCategory? extraOptionCategory) : base(extraOptionCategory)
    {
    }

    public ExtraOptionCategoryByIdPayload(IReadOnlyList<UserError> errors) : base(errors)
    {
    }
}