using Crozy.Domain.Users;
using Crozy.Domain.Orders;
using Crozy.Domain.Organisations;
using Crozy.Domain.Sites;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.DataLoader;
using Crozy.Infrastructure;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using HotChocolate.Types.Pagination;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Types
{
    public class OrderType : ObjectType<Order>
    {
        protected override void Configure(IObjectTypeDescriptor<Order> descriptor)
        {
            descriptor.Authorize(Policies.CanViewOrder, ApplyPolicy.AfterResolver);
            
            descriptor
               .ImplementsNode()
               .IdField(t => t.Id)
               .ResolveNode(GetById);

            descriptor.Field(x => x.Id).ID();
            descriptor.Field(x => x.SiteId).ID(nameof(Site));
            descriptor.Field(x => x.OrganisationId).ID(nameof(Organisation));

            descriptor
                .Field(x=>x.Items)
                .ResolveWith<OrderItemResolver>(x => x.GetOrderItemsAsync(default!, default!, default!, default!))
                .UsePaging<NonNullType<OrderItemType>>(options: new PagingOptions { IncludeTotalCount = true })
                .Name("items");

            descriptor
                .Field(x => x.CustomerDetails)
                .Type<NonNullType<CustomerDetailsType>>()
                .Name("customerDetails");

            descriptor.Ignore(x => x.IsTransient());
        }

        private Task<Order?> GetById(IResolverContext ctx, long id)
        {
            if (ctx is null)
            {
                throw new ArgumentNullException(nameof(ctx));
            }

#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
            return ctx.DataLoader<OrderByIdDataLoader>().LoadAsync(id, ctx.RequestAborted);
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
        }

        private class OrderItemResolver
        {
            public async Task<IEnumerable<OrderItem>> GetOrderItemsAsync([Parent] Order order, CrozyDbContext dbContext, OrderItemByIdDataLoader orderItemById, CancellationToken cancellationToken)
            {
                long[] orderItemIds = await dbContext.OrderItems
                                        .Where(x => x.OrderId == order.Id)
                                        .Select(x => x.Id)
                                        .ToArrayAsync(cancellationToken);

                return await orderItemById.LoadAsync(orderItemIds, cancellationToken);
            }
        }

    }
}
