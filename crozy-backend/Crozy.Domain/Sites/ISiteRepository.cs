namespace Crozy.Domain.Sites
{
    public interface ISiteRepository
    {
        void Add(Site site);

        Task<Site?> GetByIdAsync(long id, CancellationToken cancellationToken = default);

        Task SaveChangesAsync(CancellationToken cancellationToken = default);

        void Remove(Site site);
    }
}
