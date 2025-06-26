using Crozy.Domain.Payments;
using Microsoft.EntityFrameworkCore;

namespace Crozy.Infrastructure.Repositories
{
    public class PaymentTransactionRepository : BaseRepository, IPaymentTransactionRepository
    {
        public PaymentTransactionRepository(CrozyDbContext dbContext) : base(dbContext)
        {
        }

        public void Add(PaymentTransaction paymentMessage)
        {
            dbContext.PaymentTransactions.Add(paymentMessage);
        }

        public async Task<PaymentTransaction?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
        {
            return await dbContext.PaymentTransactions.FindAsync(new object[] { id }, cancellationToken: cancellationToken);
        }

        public async Task<PaymentTransaction?> GetByRequestIdAsync(Guid requestid, CancellationToken cancellationToken = default)
        {
            return await dbContext.PaymentTransactions.FirstOrDefaultAsync(x=>x.RequestId == requestid,cancellationToken);
        }

        public void Remove(PaymentTransaction paymentMessage)
        {
            dbContext.PaymentTransactions.Remove(paymentMessage);
        }
    }
}
