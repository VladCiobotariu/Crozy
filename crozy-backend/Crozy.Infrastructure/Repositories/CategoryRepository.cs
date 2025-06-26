using Crozy.Domain.Categories;
using Microsoft.EntityFrameworkCore;

namespace Crozy.Infrastructure.Repositories
{
    public class CategoryRepository: BaseRepository, ICategoryRepository
    {

        public CategoryRepository(CrozyDbContext dbContext) : base(dbContext)
        {
        }

        public void Add(Category category)
        {
            dbContext.Categories.Add(category);
        }

        public async Task<Category?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
        {
            return await dbContext.Categories.FindAsync(new object[] { id }, cancellationToken: cancellationToken);
        }

        public async Task<Category[]> GetByIdsAsync(long[] ids, CancellationToken cancellationToken = default)
        {
            return await dbContext
                .Categories
                .Where(x=> ids.Contains(x.Id))
                .ToArrayAsync(cancellationToken);
        }

        public void Remove(Category category)
        {
            dbContext.Categories.Remove(category);
        }
    }
}
