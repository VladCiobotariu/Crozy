using Crozy.Domain.Sellers;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sellers;

public class InviteUserPayload : SellerPayloadBase
{
    public InviteUserPayload(Seller seller) : base(seller)
    {
    }

    public InviteUserPayload(IReadOnlyList<UserError> errors) : base(errors)
    {
    }
}