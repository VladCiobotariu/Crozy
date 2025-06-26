using Crozy.Domain.ExtraOptions;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.ExtraOptions
{
    public class ExtraOptionPayloadBase : Payload
    {
        protected ExtraOptionPayloadBase(ExtraOption? extraOption)
        {
            ExtraOption = extraOption;
        }

        protected ExtraOptionPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public ExtraOption? ExtraOption { get; }
    }
}
