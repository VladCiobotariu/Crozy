using Crozy.Domain.ExtraOptions;
using Microsoft.EntityFrameworkCore;

namespace Crozy.Infrastructure.Repositories
{
    public class ExtraOptionRepository : BaseRepository, IExtraOptionRepository
    {
        public ExtraOptionRepository(CrozyDbContext dbContext) : base(dbContext)
        {
        }

        public void Add(ExtraOption extraOption)
        {
            dbContext.ExtraOptions.Add(extraOption);
        }

        public async Task<ExtraOption?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
        {
            return await dbContext.ExtraOptions.FindAsync([id], cancellationToken);
        }

        public async Task<ExtraOption[]> GetByIdsAsync(IReadOnlyCollection<long> ids, CancellationToken cancellationToken = default)
        {
            if (ids.Count == 0) return [];
            return await dbContext.ExtraOptions.Where(x => ids.Contains(x.Id)).ToArrayAsync(cancellationToken);
        }
        
        public void Remove(ExtraOption extraOption)
        {
            dbContext.ExtraOptions.Remove(extraOption);
        }
    }
}
