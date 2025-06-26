using Crozy.Domain.Users;
using Crozy.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader;

public class UserByIdDataLoader : BatchDataLoader<long, User>
{
    private readonly CrozyDbContext dbContext;

    public UserByIdDataLoader(
        IBatchScheduler batchScheduler,
        CrozyDbContext dbContext, DataLoaderOptions options)
        : base(batchScheduler, options)
    {
        this.dbContext = dbContext ??
                         throw new ArgumentNullException(nameof(dbContext));
    }

    protected override async Task<IReadOnlyDictionary<long, User>> LoadBatchAsync(
        IReadOnlyList<long> keys,
        CancellationToken cancellationToken)
    {
        return await dbContext.Users
            .Where(s => keys.Contains(s.Id))
            .ToDictionaryAsync(t => t.Id, cancellationToken);
    }
}