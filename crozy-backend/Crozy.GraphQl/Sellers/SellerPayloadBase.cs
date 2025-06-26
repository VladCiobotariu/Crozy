using Crozy.Domain.Sellers;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sellers;

public abstract class SellerPayloadBase  : Payload
{
    protected SellerPayloadBase(Seller seller)
    {
        Seller = seller;
    }

    protected SellerPayloadBase(IReadOnlyList<UserError> errors)
        : base(errors)
    {
    }

    public Seller? Seller { get; }
}