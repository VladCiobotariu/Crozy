using Crozy.Domain.Orders;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Orders;

public class OrdersForMePayload : Payload
{
    public OrdersForMePayload(IReadOnlyList<UserError> errors) : base(errors)
    {
    }

    public OrdersForMePayload(List<Order> orders)
    {
        this.Orders = orders;
    }
    
    public List<Order>? Orders { get; }
}