using Crozy.Domain.Orders;
using HotChocolate.Types.Relay;

namespace Crozy.GraphQL.Orders
{
    public record CancelOrderInput([property: ID(nameof(Order))] long orderId, string reason)
    {
    }
}
