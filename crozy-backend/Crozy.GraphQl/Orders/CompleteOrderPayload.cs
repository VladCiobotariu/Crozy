using Crozy.Domain.Orders;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Orders
{
    public class CompleteOrderPayload : OrderPayloadBase
    {
        public CompleteOrderPayload(Order order) : base(order)
        {
        }

        public CompleteOrderPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }
    }
}
