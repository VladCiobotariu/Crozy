using Crozy.Domain.ExtraOptions;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.ExtraOptions;

public class UpdateExtraOptionPayload : ExtraOptionPayloadBase
{
    public UpdateExtraOptionPayload(ExtraOption extraOption) : base(extraOption)
    {
    }

    public UpdateExtraOptionPayload(IReadOnlyList<UserError> errors) : base(errors)
    { 
    }
}