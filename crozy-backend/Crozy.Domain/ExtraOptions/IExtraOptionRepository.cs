namespace Crozy.Domain.ExtraOptions
{
    public interface IExtraOptionRepository
    {
        void Add(ExtraOption extraOption);

        Task<ExtraOption?> GetByIdAsync(long id, CancellationToken cancellationToken = default);

        Task<ExtraOption[]> GetByIdsAsync(IReadOnlyCollection<long> ids, CancellationToken cancellationToken = default);
        
        void Remove(ExtraOption extraOption);

        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
