using Crozy.Domain.Products;
using Crozy.GraphQL.DataLoader;
using Crozy.GraphQL.Types;
using Crozy.GraphQL.Types.FilterTypes;
using Crozy.Infrastructure;

namespace Crozy.GraphQL.Products
{
    [ExtendObjectType(GraphQLTypes.Query)]
    public class ProductQueries
    {
        [UsePaging(IncludeTotalCount = true)]
        [UseFiltering(typeof(ProductFilterType))]
        [UseSorting]
        public IQueryable<Product> GetProducts(CrozyDbContext context)
        {
            return context.Products;
        }

        public Task<Product> GetProductByIdAsync(
            [ID(nameof(Product))] long id,
            ProductByIdDataLoader productById,
            CancellationToken cancellationToken) =>
            productById.LoadAsync(id, cancellationToken);

        public Task<Product> GetProductBySlugAsync(
            string siteSlug,
            string productSlug,
            ProductBySlugDataLoader productBySlug,
            CancellationToken cancellationToken) =>
            productBySlug.LoadAsync(new ProductSlugKey(siteSlug, productSlug), cancellationToken);
    }
}
