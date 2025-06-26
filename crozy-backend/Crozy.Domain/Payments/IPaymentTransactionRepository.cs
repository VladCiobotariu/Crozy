namespace Crozy.Domain.Payments
{
    public interface IPaymentTransactionRepository
    {
        void Add(PaymentTransaction paymentMessage);

        Task<PaymentTransaction?> GetByIdAsync(long id, CancellationToken cancellationToken = default);

        Task<PaymentTransaction?> GetByRequestIdAsync(Guid requestid, CancellationToken cancellationToken = default);

        Task SaveChangesAsync(CancellationToken cancellationToken = default);

        void Remove(PaymentTransaction paymentMessage);
    }
}
