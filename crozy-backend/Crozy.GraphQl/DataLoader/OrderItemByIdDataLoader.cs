using Crozy.Domain.Orders;
using Crozy.Infrastructure;
using GreenDonut;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader
{
    public class OrderItemByIdDataLoader : BatchDataLoader<long, OrderItem>
    {
        private readonly CrozyDbContext dbContext;

        public OrderItemByIdDataLoader(
            IBatchScheduler batchScheduler,
            CrozyDbContext dbContext, DataLoaderOptions options)
            : base(batchScheduler, options)
        {
            this.dbContext = dbContext ??
                throw new ArgumentNullException(nameof(dbContext));
        }

        protected override async Task<IReadOnlyDictionary<long, OrderItem>> LoadBatchAsync(
            IReadOnlyList<long> keys,
            CancellationToken cancellationToken)
        {
            return await dbContext.OrderItems
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
