using Crozy.Domain.Sites;
using Crozy.Infrastructure;
using GreenDonut;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader
{
    public class SiteBySlugDataLoader : BatchDataLoader<string, Site>
    {
        private readonly CrozyDbContext dbContext;

        public SiteBySlugDataLoader(
            IBatchScheduler batchScheduler,
            CrozyDbContext dbContext, DataLoaderOptions options)
            : base(batchScheduler, options)
        {
            this.dbContext = dbContext ??
                throw new ArgumentNullException(nameof(dbContext));
        }

        protected override async Task<IReadOnlyDictionary<string, Site>> LoadBatchAsync(
            IReadOnlyList<string> keys,
            CancellationToken cancellationToken)
        {
            return await dbContext.Sites
                .Where(s => keys.Contains(s.Slug))
                .ToDictionaryAsync(t => t.Slug, cancellationToken);
        }
    }
}
