using Crozy.Domain.ExtraOptionCategories;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.ExtraOptionCategories;

public class UpdateExtraOptionCategoryPayload : ExtraOptionCategoryPayloadBase
{
    public UpdateExtraOptionCategoryPayload(ExtraOptionCategory extraOptionCategory) : base(extraOptionCategory)
    {
    }

    public UpdateExtraOptionCategoryPayload(IReadOnlyList<UserError> errors) : base(errors)
    { 
    }
}