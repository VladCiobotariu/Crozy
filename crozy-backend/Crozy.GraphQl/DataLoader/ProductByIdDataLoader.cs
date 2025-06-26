using Crozy.Domain.Products;
using Crozy.Infrastructure;
using GreenDonut;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader
{
    public class ProductByIdDataLoader : BatchDataLoader<long, Product>
    {
        private readonly CrozyDbContext dbContext;

        public ProductByIdDataLoader(
            IBatchScheduler batchScheduler,
            CrozyDbContext dbContext, DataLoaderOptions options)
            : base(batchScheduler, options)
        {
            this.dbContext = dbContext ??
                throw new ArgumentNullException(nameof(dbContext));
        }

        protected override async Task<IReadOnlyDictionary<long, Product>> LoadBatchAsync(
            IReadOnlyList<long> keys,
            CancellationToken cancellationToken)
        {
            return await dbContext.Products
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
