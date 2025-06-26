using Crozy.Domain.Orders;
using HotChocolate.Types.Relay;

namespace Crozy.GraphQL.Orders
{
    public record CompleteOrderInput([property: ID(nameof(Order))] long orderId)
    {
    }
}
