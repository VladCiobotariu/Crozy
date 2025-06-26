using System.Collections;
using System.Security.Claims;
using Crozy.Domain.Sellers;
using Crozy.Domain.Users;
using HotChocolate.Resolvers;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.Auth.Users;

public class ViewUserPermissionHandler : AuthorizationHandler<CanViewUserResourceRequirement, IMiddlewareContext>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CanViewUserResourceRequirement requirement,
        IMiddlewareContext resource)
    {
        ClaimsIdentity? buyerAuthIdentity = context.User.GetBuyerAuthIdentity();
        ClaimsIdentity? sellerAuthIdentity = context.User.GetSellerAuthIdentity();
        if (buyerAuthIdentity is null && sellerAuthIdentity is null)
        {
            context.Fail(new AuthorizationFailureReason(this, "Current user is not a authenticated."));
            return Task.CompletedTask;
        }
        
        if (resource.Result is null)
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }
        
        User[] users = resource.Result switch
        {
            IEnumerable enumerable => enumerable.Cast<User>().ToArray(),
            User user => [user],
            _ => throw new InvalidDataException("Query result for sellers is not of type Order.")
        };
        
        //seller
        if (sellerAuthIdentity != null)
        {
            long? sellerUserId = sellerAuthIdentity.GetUserId();
            long? sellerOrganisationId = sellerAuthIdentity.GetOrganisationId();
            Seller? sellerParent = resource.Parent<Seller?>();
            if (sellerUserId is null)
            {
                context.Fail(new AuthorizationFailureReason(this, "User is missing userId."));
                return Task.CompletedTask;
            }
            if (sellerOrganisationId is null)
            {
                context.Fail(new AuthorizationFailureReason(this, "User is missing organisationId."));
                return Task.CompletedTask;
            }
            if (users.All(x => x.Id == sellerUserId))
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }
            if (sellerAuthIdentity.HasPermission(Permissions.CanViewUsers) &&
                sellerParent is not null && sellerParent.OrganisationId == sellerOrganisationId)
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }
            context.Fail(new AuthorizationFailureReason(this, "Current user is not authorized to view this resource"));
            return Task.CompletedTask;
        }
        
        //buyer
        if (buyerAuthIdentity != null)
        {
            long? buyerUserId = buyerAuthIdentity.GetUserId();
            if (buyerUserId is null)
            {
                context.Fail(new AuthorizationFailureReason(this, "User is missing userId."));
                return Task.CompletedTask;
            }
            
            if (users.Any(x => x.Id != buyerUserId))
            {
                context.Fail(new AuthorizationFailureReason(this, "Current user is not authorized to view this resource"));
                return Task.CompletedTask;
            }
            context.Succeed(requirement);
            return Task.CompletedTask;
        }
        
        return Task.CompletedTask;
    }
}