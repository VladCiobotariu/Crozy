using Crozy.Domain.Orders;
using Crozy.Domain.Products;
using Crozy.GraphQL.DataLoader;
using Crozy.Infrastructure;
using HotChocolate;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Types
{
    public class OrderItemType : ObjectType<OrderItem>
    {
        protected override void Configure(IObjectTypeDescriptor<OrderItem> descriptor)
        {
            descriptor
               .ImplementsNode()
               .IdField(t => t.Id)
               .ResolveNode(GetById);


            descriptor.Field(x => x.Id).ID();

            descriptor.Field(x => x.OrderId).ID(nameof(Order));
            descriptor.Field(x => x.ProductId).ID(nameof(Product));

            descriptor
                .Field(x => x.Image)
                .Type<ImageType>()
                .Resolve(ResolveImage)
                .Name("image");

            descriptor
                .Field("Product")
                .Type<ProductType>()
                .ResolveWith<ProductResolver>(x=>x.GetProductAsync(default!, default!, default!))
                .Name("product");

            descriptor.Ignore(x => x.IsTransient());
        }

        private Image? ResolveImage(IResolverContext context)
        {
            var parent = context.Parent<OrderItem>();
            if (parent is null || parent.Image == null)
            {
                return null;
            }
            return new Image { Name = parent.Image };
        }

        private Task<OrderItem?> GetById(IResolverContext ctx, long id)
        {
            if (ctx is null)
            {
                throw new ArgumentNullException(nameof(ctx));
            }

#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
            return ctx.DataLoader<OrderItemByIdDataLoader>().LoadAsync(id, ctx.RequestAborted);
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
        }
        
        private class ProductResolver
        {
            public async Task<Product?> GetProductAsync([Parent] OrderItem orderItem, CrozyDbContext dbContext, CancellationToken cancellationToken)
            {
                return await dbContext.Products
                    .Where(x => x.Id == orderItem.ProductId)
                    .Select(x => x)
                    .FirstOrDefaultAsync(cancellationToken);
            }
        }
    }
}
