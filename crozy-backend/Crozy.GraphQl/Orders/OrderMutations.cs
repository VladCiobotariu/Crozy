using System.Security.Claims;
using Crozy.GraphQL.Types;
using Crozy.Domain.Exceptions;
using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Products;
using Crozy.GraphQL.Common;
using Crozy.Domain.Services;
using Crozy.GraphQL.Auth;
using Crozy.Domain.Orders;
using Crozy.Domain.Sites;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.Orders
{
    [ExtendObjectType(GraphQLTypes.Mutation)]
    public class OrderMutations
    {
        public async Task<AddOrderPayload> AddOrderForMeAsync(
            AddOrderInput input,
            IOrderRepository orderRepository,
            INotificationService notificationService,
            ISiteRepository siteRepository,
            IProductRepository productRepository,
            IOrderNumberProvider orderNumberProvider,
            IExtraOptionRepository extraOptionRepository,
            ClaimsPrincipal claimsPrincipal,
            CancellationToken cancellationToken) 
        {
            long? buyerId = claimsPrincipal.GetBuyerId();

            var site = await siteRepository.GetByIdAsync(input.siteId, cancellationToken);
            if(site is null)
            {
                return new AddOrderPayload(new[] { new UserError("Site not found", "SITE_NOT_FOUND") });
            }
            if (input.items.Length == 0)
            {
                return new AddOrderPayload(new[] { new UserError("No items found", "NO_ITEMS_FOUND") });
            }
            
            var orderNo = orderNumberProvider.GetNextOrderNumber();
            CustomerDetails customerDetails = input.customerDetails.ToCustomerDetails(buyerId);
            Order order = new Order(orderNo, input.siteId, 
                site.OrganisationId, 
                input.shippingAddress, 
                customerDetails, 
                customerNotes: input.customerNotes, 
                paymentType: input.PaymentType);

            var productIds = input.items.Select(x => x.ProductId).ToArray();
            var products = await productRepository.GetByIdsAsync(productIds, cancellationToken);

            foreach (var item in input.items)
            {
                if (products.TryGetValue(item.ProductId, out var product) && product is not null)
                {
                    ExtraOption[] extraOptions =
                        await extraOptionRepository.GetByIdsAsync(item.ExtraOptionsIds, cancellationToken);
                    order.AddProduct(product, item.Quantity, extraOptions);
                }
                else
                {
                    throw new DomainException($"Product with id {item.ProductId} does not exists");
                }
            }

            order.Submit();
            orderRepository.Add(order);
            await orderRepository.SaveChangesAsync(cancellationToken);
            await notificationService.SendOrderPlacedNotificationAsync(order, cancellationToken);

            return new AddOrderPayload(order);
        }

        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<StartOrderProcessingPayload> StartOrderProcessingAsync(
            StartOrderProcessingInput input,
            IOrderRepository orderRepository,
            IAuthorizationService authorizationService,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var orderId = input.orderId;
            var order = await orderRepository.GetOrderByIdAsync(orderId, cancellationToken);
            if (order is null)
            {
                return new StartOrderProcessingPayload(new[] { new UserError("Order not found", "ORDER_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [order], Policies.CanEditOrgEntities);
            if (authorizationFailed)
            {
                return new StartOrderProcessingPayload(errors);
            }

            order.StartProcessing();

            await orderRepository.SaveChangesAsync(cancellationToken);

            return new StartOrderProcessingPayload(order);
        }

        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<CompleteOrderPayload> CompleteOrderAsync(
            CompleteOrderInput input,
            IOrderRepository orderRepository,
            IAuthorizationService authorizationService,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var orderId = input.orderId;
            var order = await orderRepository.GetOrderByIdAsync(orderId, cancellationToken);
            if (order is null)
            {
                return new CompleteOrderPayload(new[] { new UserError("Order not found", "ORDER_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [order], Policies.CanEditOrgEntities);
            if (authorizationFailed)
            {
                return new CompleteOrderPayload(errors);
            }

            order.Complete();

            await orderRepository.SaveChangesAsync(cancellationToken);

            return new CompleteOrderPayload(order);
        }

        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<CancelOrderPayload> CancelOrderAsync(
            CancelOrderInput input,
            IOrderRepository orderRepository,
            IAuthorizationService authorizationService,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var orderId = input.orderId;
            var order = await orderRepository.GetOrderByIdAsync(orderId, cancellationToken);
            if (order is null)
            {
                return new CancelOrderPayload(new[] { new UserError("Order not found", "ORDER_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [order], Policies.CanEditOrgEntities);
            if (authorizationFailed)
            {
                return new CancelOrderPayload(errors);
            }

            order.Cancel(input.reason);


            await orderRepository.SaveChangesAsync(cancellationToken);

            return new CancelOrderPayload(order);
        }
    }
}