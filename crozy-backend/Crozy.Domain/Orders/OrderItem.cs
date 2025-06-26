using Crozy.Domain.Moneys;

namespace Crozy.Domain.Orders
{
    public class OrderItem : Entity, IOrganisationEntity
    {
        private readonly List<OrderItemExtraOption> extraOptions = new List<OrderItemExtraOption>();

        public OrderItem(
            string productName,
            long? productId,
            Money productPrice,
            decimal quantity,
            string? productDescription,
            string? image,
            long organisationId,
            List<OrderItemExtraOption> extraOptions)
        {
            ProductName = productName;
            ProductId = productId;
            ProductPrice = productPrice;
            Quantity = quantity;
            ProductDescription = productDescription;
            Image = image;
            OrganisationId = organisationId;
            this.extraOptions = extraOptions;
            OrderItemTotalPrice = (productPrice + extraOptions.Sum(x => x.Price)) * quantity;
        }

        // Constructor for EF Core
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        private OrderItem()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
            
        }

        public string ProductName { get; private set; }
        public long? ProductId { get; private set; }
        public Money ProductPrice { get; private set; }
        public Money OrderItemTotalPrice { get; private set; }
        public decimal Quantity { get; private set; }
        public string? ProductDescription { get; private set; }

        public long OrganisationId { get; private set; }

        public string? Image { get; private set; }
        public long OrderId { get; private set; }

        public IReadOnlyCollection<OrderItemExtraOption> ExtraOptions => extraOptions.AsReadOnly();
    }
}
