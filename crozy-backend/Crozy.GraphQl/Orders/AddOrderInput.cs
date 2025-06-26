using Crozy.Domain;
using Crozy.Domain.Moneys;
using Crozy.Domain.Orders;
using Crozy.Domain.Sites;
using HotChocolate.Types.Relay;

namespace Crozy.GraphQL.Orders
{
    public record AddOrderInput(
        [property: ID(nameof(Site))] long siteId,
        Address shippingAddress,
        AddOrderItem[] items,
        CustomerDetailsInput customerDetails,
        PaymentType PaymentType,
        string? customerNotes        
        );
}