

using Crozy.Domain.Buyers;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Buyers
{
    public abstract class BuyerPayloadBase : Payload
    {
        protected BuyerPayloadBase(Buyer buyer)
        {
            Buyer = buyer;
        }

        protected BuyerPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
        
        public Buyer? Buyer { get;  }
    }
}

