namespace Crozy.Domain.Orders
{
    public enum PaymentStatus
    {
        NotPaid = 1,
        AwaitingPaymentCompletion,
        Paid,
    }
}
