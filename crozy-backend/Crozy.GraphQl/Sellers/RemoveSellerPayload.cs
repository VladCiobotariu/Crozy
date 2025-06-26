using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sellers;

public class RemoveSellerPayload : Payload
{
    public RemoveSellerPayload(bool deleted)
    {
        Deleted = deleted;
    }

    public RemoveSellerPayload(IReadOnlyList<UserError> errors) : base(errors)
    {
    }
    
    public bool Deleted { get; init; }
}