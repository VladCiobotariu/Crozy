using Crozy.Domain.Sellers;
using Crozy.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader;

public class SellerByIdDataLoader : BatchDataLoader<long, Seller>
{
    private readonly CrozyDbContext dbContext;

    public SellerByIdDataLoader(IBatchScheduler batchScheduler, CrozyDbContext dbContext,
        DataLoaderOptions options) : base(batchScheduler, options)
    {
        this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    protected override async Task<IReadOnlyDictionary<long, Seller>> LoadBatchAsync(IReadOnlyList<long> keys,
        CancellationToken cancellationToken)
    {
        return await dbContext.Sellers
            .Where(s => keys.Contains(s.Id))
            .ToDictionaryAsync(t => t.Id, cancellationToken);
    }
}