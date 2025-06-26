using Crozy.Domain.Users;
using Crozy.Infrastructure;
using GreenDonut;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader;

public class UserByExternalIdDataLoader : BatchDataLoader<string, User>
{
    private readonly CrozyDbContext dbContext;

    public UserByExternalIdDataLoader(
        IBatchScheduler batchScheduler,
        CrozyDbContext dbContext, DataLoaderOptions options)
        : base(batchScheduler, options)
    {
        this.dbContext = dbContext ??
                         throw new ArgumentNullException(nameof(dbContext));
    }

    protected override async Task<IReadOnlyDictionary<string, User>> LoadBatchAsync(
        IReadOnlyList<string> keys,
        CancellationToken cancellationToken)
    {
        return await dbContext.Users
            .Where(u => keys.Contains(u.ExternalId))
            .ToDictionaryAsync(t => t.ExternalId, cancellationToken);
    }
}