namespace Crozy.Domain.Categories
{
    public interface ICategoryRepository
    {
        void Add(Category category);

        Task<Category?> GetByIdAsync(long id, CancellationToken cancellationToken = default);

        Task<Category[]> GetByIdsAsync(long[] ids, CancellationToken cancellationToken = default);

        Task SaveChangesAsync(CancellationToken cancellationToken = default);

        void Remove(Category category);

    }
}
