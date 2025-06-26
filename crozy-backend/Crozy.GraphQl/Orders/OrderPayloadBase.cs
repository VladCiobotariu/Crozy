using Crozy.Domain.Orders;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Orders
{
    public abstract class OrderPayloadBase : Payload
    {
        protected OrderPayloadBase(Order? order)
        {
            Order = order;
        }

        protected OrderPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public Order? Order { get; }
    }
}