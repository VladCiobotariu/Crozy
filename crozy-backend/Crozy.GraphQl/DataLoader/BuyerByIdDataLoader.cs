using Crozy.Domain.Buyers;
using Crozy.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader;

public class BuyerByIdDataLoader : BatchDataLoader<long, Buyer>
{
    private readonly CrozyDbContext dbContext;
    
    public BuyerByIdDataLoader(IBatchScheduler batchScheduler, CrozyDbContext dbContext, DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        this.dbContext = dbContext ??
                         throw new ArgumentNullException(nameof(dbContext));
    }

    protected override async Task<IReadOnlyDictionary<long, Buyer>> LoadBatchAsync(IReadOnlyList<long> keys, CancellationToken cancellationToken)
    {
        return await dbContext.Buyers
            .Where(s => keys.Contains(s.Id))
            .ToDictionaryAsync(t => t.Id, cancellationToken);
    }
}