using System.Collections;
using System.Security.Claims;
using Crozy.Domain.Sellers;
using HotChocolate.Resolvers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace Crozy.GraphQL.Auth.Organisations;

public class ViewSellersHandler: AuthorizationHandler<CanViewSellersRequirement, IMiddlewareContext>
{
    
    private readonly ILogger<ViewSellersHandler> logger;

    public ViewSellersHandler(ILogger<ViewSellersHandler> logger)
    {
        this.logger = logger;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CanViewSellersRequirement requirement,
        IMiddlewareContext resource)
    {
        ClaimsIdentity? sellerAuthIdentity = context.User.GetSellerAuthIdentity();

        if (sellerAuthIdentity is null)
        {
            context.Fail(new AuthorizationFailureReason(this, "Current user is not a seller"));
            return Task.CompletedTask;
        }

        if (resource.Result is null)
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }
        
        Seller[] sellers = resource.Result switch
        {
            IEnumerable enumerable => enumerable.Cast<Seller>().ToArray(),
            Seller seller => [seller],
            _ => throw new InvalidDataException("Query result for sellers is not of type Seller.")
        };
        
        if (sellers.All(x => x.UserId == sellerAuthIdentity.GetUserId()))
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        if (sellerAuthIdentity.HasPermission(Permissions.CanViewUsers) &&
            sellers.All(x => x.OrganisationId == sellerAuthIdentity.GetOrganisationId()))
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }
        
        context.Fail(new AuthorizationFailureReason(this, "User does not have permission to view this resource."));
        return Task.CompletedTask;
    }
}