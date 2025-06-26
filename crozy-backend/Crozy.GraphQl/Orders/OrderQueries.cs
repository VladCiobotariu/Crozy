using System.Security.Claims;
using Crozy.Domain.Orders;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Organisations;
using Crozy.GraphQL.Types;
using Crozy.GraphQL.Types.FilterTypes;
using Crozy.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Orders
{
    [ExtendObjectType(GraphQLTypes.Query)]
    public class OrderQueries
    {
        [UsePaging(IncludeTotalCount = true)]
        [UseFiltering(typeof(OrderFilterType))]
        [UseSorting]
        [HotChocolate.Authorization.Authorize(Policy = Policies.CanReadOrgEntities)]
        public async Task<List<Order>> GetOrders(CrozyDbContext context,
            [GlobalState(OrganisationsConst.OrganisationId)] long organisationId, CancellationToken cancellationToken)
        {
            var orders = await context.Orders.Where(x => x.OrganisationId == organisationId)
                .ToListAsync(cancellationToken);
            return orders;
        }

        [HotChocolate.Authorization.Authorize]
        public async Task<OrderByIdPayload> GetOrderByIdAsync(
            [ID(nameof(Order))] long id,
            IOrderRepository orderRepository,
            IAuthorizationService authorizationService,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var order = await orderRepository.GetOrderByIdAsync(id, cancellationToken);
            if (order is null)
            {
                return new OrderByIdPayload(new[] { new UserError("Order not found.", "NOT_FOUND") });
            }
            
            return new OrderByIdPayload(order);
        }


        [HotChocolate.Authorization.Authorize(Policy = Policies.CanReadOrgEntities)]
        public async Task<OrdersSummaryPayload> GetOrdersSummaryAsync(
            CrozyDbContext crozyDbContext,
            [GlobalState(OrganisationsConst.OrganisationId)] long organisationId, 
            CancellationToken cancellationToken)
        {
            var queyResults = await (from order in crozyDbContext.Orders
                 where order.OrganisationId == organisationId
                 where order.StateDescription.OrderState == OrderState.Processing || order.StateDescription.OrderState == OrderState.AwaitingPayment
                 group order by order.StateDescription.OrderState into ordersByState
                 select new { State = ordersByState.Key, Counts = ordersByState.Count() }).ToListAsync(cancellationToken);

            var newOrdersGroup = queyResults.FirstOrDefault(x => x.State == OrderState.AwaitingPayment);
            var processingOrdersGroup = queyResults.FirstOrDefault(x => x.State == OrderState.Processing);

            var newOrdersCount = newOrdersGroup is not null ? newOrdersGroup.Counts : 0;
            var processingOrdersCount = processingOrdersGroup is not null ? processingOrdersGroup.Counts : 0;

            return new OrdersSummaryPayload(newOrdersCount, processingOrdersCount);

        }

        [UsePaging(IncludeTotalCount = true)]
        [UseSorting]
        [UseFiltering]
        [HotChocolate.Authorization.Authorize(Policy = Policies.IsCustomer)]
        public async Task<List<Order>> GetOrdersForMeAsync(
            CrozyDbContext crozyDbContext,
            ClaimsPrincipal claimsPrincipal,
            CancellationToken cancellationToken)
        {
            var buyerId = claimsPrincipal.GetBuyerId();
        
            List<Order> orders = await (
                from order in crozyDbContext.Orders
                where order.CustomerDetails.BuyerId == buyerId
                select order).ToListAsync(cancellationToken);
        
            return orders;
        }
    }
}
