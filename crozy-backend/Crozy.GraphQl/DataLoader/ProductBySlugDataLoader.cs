using Crozy.Domain.Products;
using Crozy.Infrastructure;
using GreenDonut;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.DataLoader
{
    public record ProductSlugKey(string siteSlug, string productSlug);

    public class ProductBySlugDataLoader : BatchDataLoader<ProductSlugKey, Product>
    {
        private readonly CrozyDbContext dbContext;

        public ProductBySlugDataLoader(
            IBatchScheduler batchScheduler,
            CrozyDbContext dbContext, DataLoaderOptions options)
            : base(batchScheduler, options)
        {
            this.dbContext = dbContext ??
                throw new ArgumentNullException(nameof(dbContext));
        }

        protected override async Task<IReadOnlyDictionary<ProductSlugKey, Product>> LoadBatchAsync(
            IReadOnlyList<ProductSlugKey> keys,
            CancellationToken cancellationToken)
        {
            var siteSlugs = keys.Select(x => x.siteSlug).ToArray();
            var productSlugs = keys.Select(x => x.productSlug).ToArray();

            return await (from product in dbContext.Products
                          join site in dbContext.Sites on product.SiteId equals site.Id
                          where siteSlugs.Contains(site.Slug) && productSlugs.Contains(product.Slug)
                          select new { key = new ProductSlugKey(site.Slug, product.Slug), product }
                          )
                        .ToDictionaryAsync(t => t.key, t => t.product, cancellationToken);
        }
    }
}
