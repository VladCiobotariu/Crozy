namespace Crozy.Domain.Orders
{
    public record OrderStateDescription(OrderState OrderState, string? StateChangeDescription = null)
    {
        public bool IsOpen =>
            OrderState switch
            {
                OrderState.AwaitingPayment or OrderState.Processing => true,
                _ => false,
            };
    }

}
