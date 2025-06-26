using Crozy.Domain.Categories;
using Crozy.Domain.Organisations;
using Crozy.Domain.Products;
using Crozy.GraphQL.DataLoader;
using Crozy.Infrastructure;
using HotChocolate;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using HotChocolate.Types.Pagination;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Types
{
    public class CategoryType : ObjectType<Category>
    {
        protected override void Configure(IObjectTypeDescriptor<Category> descriptor)
        {
            descriptor
               .ImplementsNode()
               .IdField(t => t.Id)
               .ResolveNode(GetById);
            
            descriptor.Field(x => x.OrganisationId).ID(nameof(Organisation));

            descriptor
                .Field("Products")
                .ResolveWith<ProductResolver>(x => x.GetProductsAsync(default!, default!, default!, default!))
                .UsePaging<NonNullType<ProductType>>(options: new PagingOptions { IncludeTotalCount = true })
                .UseSorting()
                .Name("products");

            descriptor.Ignore(x => x.IsTransient());
        }

        private Task<Category?> GetById(IResolverContext ctx, long id)
        {
            if (ctx is null)
            {
                throw new ArgumentNullException(nameof(ctx));
            }

#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
            return ctx.DataLoader<CategoryByIdDataLoader>().LoadAsync(id, ctx.RequestAborted);
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
        }

        private class ProductResolver
        {
            public async Task<IEnumerable<Product>> GetProductsAsync([Parent] Category category, CrozyDbContext dbContext, ProductByIdDataLoader productById, CancellationToken cancellationToken)
            {
                long[] productIds = await dbContext.ProductCategories
                    .Where(x => x.CategoryId == category.Id)
                    .Select(x => x.ProductId)
                    .ToArrayAsync();

                return await productById.LoadAsync(productIds, cancellationToken);
            }
        }

    }
}
