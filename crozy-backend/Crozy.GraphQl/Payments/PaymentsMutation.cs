using Crozy.Domain.Orders;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Types;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Crozy.GraphQL.Payments
{
    public class PaymentDataResult : Payload
    {
        public PaymentDataResult(IReadOnlyList<UserError>? errors): base(errors) { }
        public PaymentDataResult(PaymentData pymentData)
        {
            PymentData = pymentData;
        }

        public PaymentData? PymentData { get; }
    }

    public record CreatePaymentDataInput([property: ID(nameof(Domain.Orders.Order))] long orderId);

    [ExtendObjectType(GraphQLTypes.Mutation)]
    public class PaymentsMutation
    {
        public async Task<PaymentDataResult> CreatePaymentData(
            CreatePaymentDataInput input,
            IPaymentService paymentService,
            IOrderRepository orderRepository,
            ClaimsPrincipal user,
            IAuthorizationService authorizationService,
            CancellationToken cancellationToken)
        {
            var orderId = input.orderId;
            var order = await orderRepository.GetOrderByIdAsync(orderId, cancellationToken);

            if (order is null)
            {
                return new PaymentDataResult(new[] { new UserError("Order not found", "ORDER_NOT_FOUND") });
            }

            if(!order.IsWaitingForPayment)
            {
                return new PaymentDataResult([new UserError("Not able to generate payment data because order not requires payment", "PAYMENT_NOT_REQUIRED")]);
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeForGraphQlAsync(user, order, Policies.CanGeneratePaymentForOrder);
            if (authorizationFailed)
            {
                return new PaymentDataResult(errors);
            }

            var data = await paymentService.GetPaymentData(order);

            return new PaymentDataResult(data);
        }
    }
}
