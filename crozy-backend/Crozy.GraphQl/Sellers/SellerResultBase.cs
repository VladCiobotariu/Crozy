using Crozy.Domain.Organisations;
using Crozy.Domain.Sellers;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sellers;

public abstract class SellerResultBase : Result
{
    protected SellerResultBase(Seller? seller)
    {
        this.Seller = seller;
    }

    protected SellerResultBase(IReadOnlyList<UserError> errors)
        : base(errors)
    {
    }
    
    public Seller? Seller { get; }
}