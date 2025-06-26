using Crozy.Domain.Categories;
using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Organisations;
using Crozy.Domain.Products;
using Crozy.Domain.Sites;
using Crozy.GraphQL.DataLoader;
using Crozy.Infrastructure;
using HotChocolate;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Types
{
    public class ProductType : ObjectType<Product>
    {
        protected override void Configure(IObjectTypeDescriptor<Product> descriptor)
        {
            descriptor
               .ImplementsNode()
               .IdField(x => x.Id)
               .ResolveNode(GetById);

            descriptor.Field(x => x.SiteId).ID(nameof(Site));
            descriptor.Field(x => x.OrganisationId).ID(nameof(Organisation));

            descriptor
                .Field("Categories")
                .ResolveWith<CategoryResolver>(x =>
                    x.GetCategoryAsync(default!, default!, default!, default))
                .Name("categories");

            descriptor
                .Field("Site")
                .ResolveWith<SiteSummaryResolver>(x => x.GetSiteSummaryAsync(default!, default!, default!))
                .Name("siteSummary");

            descriptor
                .Field(x => x.Image)
                .Type<ImageType>()
                .Resolve(ResolveImage)
                .Name("image");

            descriptor
                .Field("extraOptions")
                .ResolveWith<ExtraOptionsResolver>(x => x.GetExtraOptionsAsync(default!, default!, default!, default!))
                .Name("extraOptions");

            descriptor.Ignore(x => x.IsTransient());
            descriptor.Ignore(x => x.CategoryLinks);
            descriptor.Ignore(x => x.ExtraOptionLinks);
        }

        private Image? ResolveImage(IResolverContext context)
        {
            var parent = context.Parent<Product>();
            if (parent is null || parent.Image == null)
            {
                return null;
            }
            return new Image { Name = parent.Image };
        }

        private Task<Product?> GetById(IResolverContext ctx, long id)
        {
            if (ctx is null)
            {
                throw new ArgumentNullException(nameof(ctx));
            }

#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
            return ctx.DataLoader<ProductByIdDataLoader>()
                      .LoadAsync(id, ctx.RequestAborted);
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
        }

        private class CategoryResolver
        {
            public async Task<IEnumerable<Category>> GetCategoryAsync([Parent] Product product, CrozyDbContext dbContext, CategoryByIdDataLoader categoryById, CancellationToken cancellationToken)
            {
                long[] categoryIds = await dbContext.ProductCategories
                    .Where(s => s.ProductId == product.Id)
                    .Select(s => s.CategoryId)
                    .ToArrayAsync();
        
                return await categoryById.LoadAsync(categoryIds, cancellationToken);
            }
        }

        private class SiteSummaryResolver
        {
            public async Task<Site> GetSiteSummaryAsync([Parent] Product product, SiteByIdDataLoader siteById, CancellationToken cancellationToken)
            {
                long siteId = product.SiteId;
                return await siteById.LoadAsync(siteId, cancellationToken);
            }
        }

        private class ExtraOptionsResolver
        {
            public async Task<IReadOnlyList<ExtraOption>> GetExtraOptionsAsync([Parent] Product product, ExtraOptionByIdLoader dataLoader, CrozyDbContext dbContext, CancellationToken cancellationToken)
            {
                long[] extraOptionIds = await dbContext.ProductExtraOptionLinks
                                                        .Where(x => x.ProductId == product.Id)
                                                        .Select(x => x.ExtraOptionId)
                                                        .ToArrayAsync(cancellationToken);

                return await dataLoader.LoadAsync(extraOptionIds, cancellationToken);
            }
        }
    }
}
