using Crozy.Domain.Products;
using Microsoft.EntityFrameworkCore;

namespace Crozy.Infrastructure.Repositories
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(CrozyDbContext dbContext) : base(dbContext)
        {
        }

        public void Add(Product product)
        {
            dbContext.Products.Add(product);
        }

        public async Task<Product?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
        {
            return await dbContext
                .Products
                .Where(p => p.Id == id)
                .Include(p => p.CategoryLinks)
                .Include(p => p.ExtraOptionLinks)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Dictionary<long, Product?>> GetByIdsAsync(IEnumerable<long> productIds, CancellationToken cancellationToken = default)
        {
            var products = await dbContext
                .Products
                .Where(x => productIds.Contains(x.Id))
                .Include(p => p.CategoryLinks)
                .Include(p => p.ExtraOptionLinks)
                .ToDictionaryAsync(x => x.Id, cancellationToken);

            var result = products.ToDictionary(x => x.Key, x => products.ContainsKey(x.Key) ? products[x.Key] : null);
            return result;
        }

        public void Remove(Product product)
        {
            dbContext.Products.Remove(product);
        }
    }
}
