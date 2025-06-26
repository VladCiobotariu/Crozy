namespace Crozy.Domain.Orders
{
    public enum OrderState
    {
        Draft = 0,
        AwaitingPayment = 1,
        Processing = 2,
        Delivering = 3,
        Completed = 4,
        Canceled = 5,
    }
}
