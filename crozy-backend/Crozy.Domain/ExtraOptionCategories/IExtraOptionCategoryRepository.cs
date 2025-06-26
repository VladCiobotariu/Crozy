namespace Crozy.Domain.ExtraOptionCategories
{
    public interface IExtraOptionCategoryRepository
    {
        void Add(ExtraOptionCategory category);

        Task<ExtraOptionCategory?> GetByIdAsync(long id, CancellationToken cancellationToken = default);
        
        void Remove(ExtraOptionCategory extraOptionCategory);

        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
