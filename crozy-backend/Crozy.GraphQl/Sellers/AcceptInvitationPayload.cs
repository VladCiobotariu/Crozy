using Crozy.Domain.Sellers;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sellers;

public class AcceptInvitationPayload : SellerPayloadBase
{
    public AcceptInvitationPayload(Seller seller, InvitationResult invitationResult) : base(seller)
    {
        InvitationResult = invitationResult;
    }

    public AcceptInvitationPayload(IReadOnlyList<UserError> errors) : base(errors)
    {
    }
    
    public InvitationResult? InvitationResult { get; init; }
}