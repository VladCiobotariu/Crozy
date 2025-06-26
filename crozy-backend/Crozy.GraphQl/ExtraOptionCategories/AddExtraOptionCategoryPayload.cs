using Crozy.Domain.ExtraOptionCategories;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.ExtraOptionCategories
{
    public class AddExtraOptionCategoryPayload : ExtraOptionCategoryPayloadBase
    {
        public AddExtraOptionCategoryPayload(ExtraOptionCategory? extraOptionCategory) : base(extraOptionCategory)
        {
        }

        public AddExtraOptionCategoryPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }
    }
}
