using Crozy.Domain.Categories;
using Crozy.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader
{
    public class CategoryByIdDataLoader : BatchDataLoader<long, Category>
    {
        private readonly CrozyDbContext dbContext;

        public CategoryByIdDataLoader(
            IBatchScheduler batchScheduler,
            CrozyDbContext dbContext, DataLoaderOptions options)
            : base(batchScheduler, options)
        {
            this.dbContext = dbContext ??
                throw new ArgumentNullException(nameof(dbContext));
        }

        protected override async Task<IReadOnlyDictionary<long, Category>> LoadBatchAsync(
            IReadOnlyList<long> keys,
            CancellationToken cancellationToken)
        {
            return await dbContext.Categories
                .Where(s => keys.Contains(s.Id))
                .ToDictionaryAsync(t => t.Id, cancellationToken);
        }
    }
}
