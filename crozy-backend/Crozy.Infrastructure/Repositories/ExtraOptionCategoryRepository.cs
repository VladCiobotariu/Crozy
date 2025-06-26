using Crozy.Domain.ExtraOptionCategories;

namespace Crozy.Infrastructure.Repositories
{
    public class ExtraOptionCategoryRepository : BaseRepository, IExtraOptionCategoryRepository
    {
        public ExtraOptionCategoryRepository(CrozyDbContext dbContext) : base(dbContext)
        {
        }

        public void Add(ExtraOptionCategory category)
        {
            dbContext.ExtraOptionCategories.Add(category);
        }

        public async Task<ExtraOptionCategory?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
        {
            return await dbContext.ExtraOptionCategories.FindAsync([id], cancellationToken);
        }
        
        public void Remove(ExtraOptionCategory extraOptionCategory)
        {
            dbContext.ExtraOptionCategories.Remove(extraOptionCategory);
        }
    }
}
