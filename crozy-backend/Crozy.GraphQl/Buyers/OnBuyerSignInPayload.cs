

using Crozy.Domain.Buyers;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Buyers
{
    public class OnBuyerSignInPayload : BuyerPayloadBase
    {
        public OnBuyerSignInPayload(Buyer buyer) : base(buyer)
        {
        }

        public OnBuyerSignInPayload(UserError[] userErrors) : base(userErrors)
        {
        }
    }
}

