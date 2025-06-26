using Crozy.Domain.Products;
using HotChocolate.Types.Relay;
using System.ComponentModel.DataAnnotations;
using Crozy.Domain.ExtraOptions;
using Crozy.GraphQL.ExtraOptions;

namespace Crozy.GraphQL.Orders
{
    public class AddOrderItem
    {
        [ID(nameof(Product))]
        public long ProductId { get; set; }

        [Range(0, 10000)]
        public decimal Quantity { get; set; }
        
        [ID(nameof(ExtraOption))]
        public long[] ExtraOptionsIds { get; set; }
    }
}
