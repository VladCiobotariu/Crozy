using Crozy.Domain.Sellers;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sellers;

public class SellerByIdResult : SellerResultBase
{
    public SellerByIdResult(Seller seller) : base(seller)
    {
    }

    public SellerByIdResult(IReadOnlyList<UserError> errors) : base(errors)
    {
    }
}