using Crozy.Domain.ExtraOptions;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.ExtraOptions;

public class ExtraOptionByIdPayload : ExtraOptionPayloadBase
{
    public ExtraOptionByIdPayload(ExtraOption? extraOption) : base(extraOption)
    {
    }

    public ExtraOptionByIdPayload(IReadOnlyList<UserError> errors) : base(errors)
    {
    }
}