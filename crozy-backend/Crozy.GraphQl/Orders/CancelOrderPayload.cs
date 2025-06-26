using Crozy.Domain.Orders;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Orders
{
    public class CancelOrderPayload : OrderPayloadBase
    {
        public CancelOrderPayload(Order order) : base(order)
        {
        }

        public CancelOrderPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }
    }
}
