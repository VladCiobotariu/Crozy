using Crozy.Domain.Categories;
using Crozy.Domain.Organisations;
using Crozy.Domain.Products;
using Crozy.Domain.Sites;
using Crozy.GraphQL.DataLoader;
using Crozy.Infrastructure;
using HotChocolate;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using HotChocolate.Types.Pagination;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Types
{
    public class SiteType : ObjectType<Site>
    {
        protected override void Configure(IObjectTypeDescriptor<Site> descriptor)
        {
            descriptor
               .ImplementsNode()
               .IdField(x => x.Id)
               .ResolveNode(GetById);
            
            descriptor.Field(x => x.OrganisationId).ID(nameof(Organisation));
            
            descriptor
                .Field("categories")
                .ResolveWith<CategoryResolver>(x => x.GetCategoriesAsync(default!, default!, default!, default!))
                .UsePaging<NonNullType<CategoryType>>()
                .UseSorting()
                .Name("categories");

            descriptor
                .Field("products")
                .ResolveWith<ProductResolver>(x => x.GetProductsAsync(default!, default!, default!, default!))
                .UsePaging<NonNullType<ProductType>>(options: new PagingOptions { IncludeTotalCount = true })
                .Name("products");

            descriptor.Ignore(x => x.IsTransient());
        }

        private Task<Site?> GetById(IResolverContext ctx, long id)
        {
            if (ctx is null)
            {
                throw new ArgumentNullException(nameof(ctx));
            }

#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
            return ctx.DataLoader<SiteByIdDataLoader>().LoadAsync(id, ctx.RequestAborted);
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
        }

        private class CategoryResolver
        {
            public async Task<IEnumerable<Category>> GetCategoriesAsync([Parent] Site site, CrozyDbContext dbContext, CategoryByIdDataLoader categoryById, CancellationToken cancellationToken)
            {
                long[] categoryIds = await (from product in dbContext.Products
                                     join productCategory in dbContext.ProductCategories
                                         on product.Id equals productCategory.ProductId
                                     select productCategory.CategoryId)
                                     .Distinct()
                                    .ToArrayAsync(cancellationToken);

                return await categoryById.LoadAsync(categoryIds, cancellationToken);
            }
        }

        private class ProductResolver
        {
            public async Task<IEnumerable<Product>> GetProductsAsync([Parent] Site site, CrozyDbContext dbContext, ProductByIdDataLoader productById, CancellationToken cancellationToken)
            {
                long[] productIds = await (from product in dbContext.Products
                                            where product.SiteId == site.Id
                                            select product.Id)
                                     .Distinct()
                                    .ToArrayAsync(cancellationToken);

                return await productById.LoadAsync(productIds, cancellationToken);
            }
        }

    }
}
