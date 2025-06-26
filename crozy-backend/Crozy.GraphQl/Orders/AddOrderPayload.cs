using Crozy.Domain.Orders;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Orders
{
    public class AddOrderPayload : OrderPayloadBase
    {
        public AddOrderPayload(Order order) : base(order)
        {
        }

        public AddOrderPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }
    }
}