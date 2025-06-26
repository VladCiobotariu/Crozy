using Crozy.Domain.Orders;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Orders
{
    public class StartOrderProcessingPayload : OrderPayloadBase
    {
        public StartOrderProcessingPayload(Order order) : base(order)
        {
        }

        public StartOrderProcessingPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }
    }
}
