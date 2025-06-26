namespace Crozy.Domain.Orders
{
    public class PaymentState
    {
        private PaymentState()
        {
        }

        private PaymentState(PaymentType type, PaymentStatus status, long? paymentTransactionId = null)
        {
            Type = type;
            Status = status;
            PaymentTransactionId = paymentTransactionId;
        }

        public PaymentType Type { get; private set; }

        public PaymentStatus Status { get; private set; }

        public long? PaymentTransactionId { get; private set; }

        public bool CanAcceptPayment =>
            Status switch
            {
                PaymentStatus.NotPaid or PaymentStatus.AwaitingPaymentCompletion => true,
                _ => false,
            };

        public PaymentState Paid(long paymentMessageId)
        {
            return new PaymentState(Type, PaymentStatus.Paid, paymentMessageId);
        }

        public static PaymentState NewCash()
        {
            return new PaymentState(PaymentType.Cash, PaymentStatus.NotPaid);
        }

        public static PaymentState NewCard()
        {
            return new PaymentState(PaymentType.Card, PaymentStatus.AwaitingPaymentCompletion);
        }

        public static PaymentState NewFromType(PaymentType type) =>
            type switch
            {
                PaymentType.Cash => NewCash(),
                PaymentType.Card => NewCard(),
                _ => throw new InvalidOperationException("Can't create new payment state because provided PaymentType is unknown"),
            };
        
    }
}
