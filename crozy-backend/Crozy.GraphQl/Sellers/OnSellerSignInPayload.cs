using Crozy.Domain.Buyers;
using Crozy.Domain.Sellers;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sellers
{
    public class OnSellerSignInPayload : SellerPayloadBase
    {
        public OnSellerSignInPayload(Seller seller) : base(seller)
        {
        }

        public OnSellerSignInPayload(UserError[] userErrors) : base(userErrors)
        {
        }
    }
}