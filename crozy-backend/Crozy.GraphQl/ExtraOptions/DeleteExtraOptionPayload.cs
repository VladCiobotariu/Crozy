using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.ExtraOptions;

public class DeleteExtraOptionPayload : Payload
{
    public DeleteExtraOptionPayload(bool deleted) 
    {
        Deleted = deleted;
    }

    public DeleteExtraOptionPayload(IReadOnlyList<UserError> errors) : base(errors) { }

    public bool Deleted { get; }
}