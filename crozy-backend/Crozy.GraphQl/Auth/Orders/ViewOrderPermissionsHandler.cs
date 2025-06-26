using System.Collections;
using System.Security.Claims;
using Crozy.Domain.Orders;
using Crozy.GraphQL.Orders;
using Crozy.Infrastructure.Extensions;
using HotChocolate.Resolvers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace Crozy.GraphQL.Auth.Orders;

public class ViewOrderPermissionsHandler : AuthorizationHandler<CanViewOrderRequirement, IMiddlewareContext>
{
    private static readonly string AddOrderForMeOperation = nameof(OrderMutations.AddOrderForMeAsync)
                            .FirstCharacterToLower().TrimEndWithSubstring("Async");

    private readonly ILogger<ViewOrderPermissionsHandler> logger;

    public ViewOrderPermissionsHandler(ILogger<ViewOrderPermissionsHandler> logger)
    {
        this.logger = logger;
    }
    
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CanViewOrderRequirement requirement, IMiddlewareContext resource)
    {
        
        ClaimsIdentity? buyerAuthIdentity = context.User.GetBuyerAuthIdentity();
        ClaimsIdentity? sellerAuthIdentity = context.User.GetSellerAuthIdentity();

        bool userIsNotAuthenticated = sellerAuthIdentity is null && buyerAuthIdentity is null;
        if (userIsNotAuthenticated)
        {
            string currentOperation = resource.Operation.First().Selections.First().ResponseName;

            if (currentOperation == AddOrderForMeOperation)
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }
            else
            {
                logger.LogDebug("Authorization error: view Order denied because " +
                    "current user is not authneticated and '{currentOperation}' operation " +
                    "is not permitted for unauthenticated users", currentOperation);

                context.Fail(new AuthorizationFailureReason(this, "Current user is not a authenticated."));
                return Task.CompletedTask;
            }
        }
        
        if (resource.Result is null)
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        Order[] orders = resource.Result switch
        {
            IEnumerable enumerable => enumerable.Cast<Order>().ToArray(),
            Order order => [order],
            _ => throw new InvalidDataException("Query result for sellers is not of type Order.")
        };

        // buyer
        if (buyerAuthIdentity != null)
        {
            long? buyerId = buyerAuthIdentity.GetBuyerId();
            if (buyerId is null)
            {
                context.Fail(new AuthorizationFailureReason(this, "User is missing buyerId."));
                return Task.CompletedTask;
            }

            if (orders.Any(x => x.CustomerDetails.BuyerId != buyerId))
            {
                context.Fail(new AuthorizationFailureReason(this, "User is not owner of this orders."));
                return Task.CompletedTask;
            }
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        //seller
        if (sellerAuthIdentity != null)
        {
            long? organisationId = sellerAuthIdentity.GetOrganisationId();
            if(organisationId is null)
            {
                context.Fail(new AuthorizationFailureReason(this, "User is missing organisationId."));
                return Task.CompletedTask;
            }
            if(orders.Length == 0)
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }
            if(!sellerAuthIdentity.HasPermission(Permissions.CanViewOrder))
            {
                context.Fail(new AuthorizationFailureReason(this, "User is missing permissions."));
                return Task.CompletedTask;
            }
            if(orders.Any(x => x.OrganisationId != organisationId))
            {
                context.Fail(new AuthorizationFailureReason(this, "User does not have access to view this orders."));
                return Task.CompletedTask;
            }
            
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        return Task.CompletedTask;
    }
}

