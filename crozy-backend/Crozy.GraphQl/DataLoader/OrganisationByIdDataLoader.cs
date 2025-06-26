using Crozy.Domain.Organisations;
using Crozy.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader;

public class OrganisationByIdDataLoader : BatchDataLoader<long, Organisation>
{
    private readonly CrozyDbContext dbContext;
    
    public OrganisationByIdDataLoader(IBatchScheduler batchScheduler, CrozyDbContext dbContext, DataLoaderOptions? options = null) : base(batchScheduler, options)
    {
        this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    protected override async Task<IReadOnlyDictionary<long, Organisation>> LoadBatchAsync(IReadOnlyList<long> keys, CancellationToken cancellationToken)
    {
        return await dbContext.Organisations
            .Where(s => keys.Contains(s.Id))
            .ToDictionaryAsync(t => t.Id, cancellationToken);
    }
}