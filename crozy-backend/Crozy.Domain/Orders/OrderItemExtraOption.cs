using Crozy.Domain.Moneys;

namespace Crozy.Domain.Orders
{
    public class OrderItemExtraOption
    {
        public OrderItemExtraOption(string name, Money price, long extraOptionId)
        {
            Name = name;
            Price = price;
            ExtraOptionId = extraOptionId;
        }

        // EF Core constructor
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        private OrderItemExtraOption()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
        }

        public string Name { get; }

        public Money Price { get; }

        public long? ExtraOptionId { get; }
    }
}
