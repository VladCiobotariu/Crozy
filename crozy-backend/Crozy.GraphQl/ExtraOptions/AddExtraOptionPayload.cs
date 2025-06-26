using Crozy.Domain.ExtraOptions;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.ExtraOptions
{
    public class AddExtraOptionPayload : ExtraOptionPayloadBase
    {
        public AddExtraOptionPayload(ExtraOption? extraOption) : base(extraOption)
        {
        }

        public AddExtraOptionPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }
    }
}