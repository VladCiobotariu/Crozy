using Crozy.Domain.Sites;

namespace Crozy.Infrastructure.Repositories
{
    public class SiteRepository : BaseRepository, ISiteRepository
    {
        public SiteRepository(CrozyDbContext dbContext): base(dbContext)
        {
        }

        public async Task<Site?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
        {
            var site = await dbContext.Sites.FindAsync(new object[] { id }, cancellationToken);
            return site;
        }

        public void Add(Site site)
        {
            dbContext.Sites.Add(site);
        }

        public void Remove(Site site)
        {
            dbContext.Sites.Remove(site);
        }
    }
}
