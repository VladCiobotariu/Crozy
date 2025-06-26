using Crozy.Domain.Orders;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Crozy.GraphQL.Auth.Orders
{
    public class CanGeneratePaymentForOrderHandler : AuthorizationHandler<CanGeneratePaymentForOrderRequirement, Order>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CanGeneratePaymentForOrderRequirement requirement, Order order)
        {
            if (order.BelongsToAnonymousUser)
            {
                if (order.IsWaitingForPayment)
                {
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            }
            else 
            {
                ClaimsIdentity? authIdentity = context.User.GetBuyerAuthIdentity();
                if (authIdentity == null)
                {
                    context.Fail(new AuthorizationFailureReason(this, "User must be authorized to access this order"));
                    return Task.CompletedTask;
                }
                else
                {
                    var buyerId = authIdentity.GetBuyerId();
                    if (buyerId != null)
                    {
                        if (buyerId == order.CustomerDetails.BuyerId)
                        {
                            context.Succeed(requirement);
                        }
                        else
                        {
                            context.Fail(new AuthorizationFailureReason(this, "This user does not have access to given order"));
                        }
                    }
                }
            }

            return Task.CompletedTask;
        }
    }
}
