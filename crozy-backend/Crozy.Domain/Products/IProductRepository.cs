namespace Crozy.Domain.Products
{
    public interface IProductRepository
    {
        void Add(Product product);
        Task<Product?> GetByIdAsync(long id, CancellationToken cancellationToken = default);
        Task<Dictionary<long, Product?>> GetByIdsAsync(IEnumerable<long> productIds, CancellationToken cancellationToken = default);
        Task SaveChangesAsync(CancellationToken cancellationToken = default);
        void Remove(Product product);
    }
}