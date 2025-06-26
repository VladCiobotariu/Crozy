using Crozy.Domain.Orders;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Orders;

public class OrderByIdPayload : OrderPayloadBase
{
    public OrderByIdPayload(Order order) : base(order)
    {
    }

    public OrderByIdPayload(IReadOnlyList<UserError> errors) : base(errors)
    {
    }
}