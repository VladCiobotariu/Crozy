using Crozy.Domain.Orders;
using Crozy.Infrastructure;
using GreenDonut;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader
{
    public class OrderByIdDataLoader : BatchDataLoader<long, Order?>
    {
        private readonly CrozyDbContext dbContext;

        public OrderByIdDataLoader(
            IBatchScheduler batchScheduler,
            CrozyDbContext dbContext, DataLoaderOptions options)
            : base(batchScheduler, options)
        {
            this.dbContext = dbContext ??
                throw new ArgumentNullException(nameof(dbContext));
        }

        protected override async Task<IReadOnlyDictionary<long, Order?>> LoadBatchAsync(
            IReadOnlyList<long> keys,
            CancellationToken cancellationToken)
        {
            return await (from order in dbContext.Orders where keys.Contains(order.Id) select order)
                .ToDictionaryAsync(t=>t.Id, cancellationToken);
        }
    }
}