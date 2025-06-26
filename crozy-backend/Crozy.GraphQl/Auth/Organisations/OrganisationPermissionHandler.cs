using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.Auth.Organisations
{
    public class OrganisationPermissionHandler : AuthorizationHandler<OrganisationPermissionRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OrganisationPermissionRequirement requirement)
        {
            ClaimsIdentity? authIdentity = context.User.GetSellerAuthIdentity();

            if (authIdentity == null)
            {
                context.Fail(new AuthorizationFailureReason(this, "Current user is not seller"));
                return Task.CompletedTask;
            }

            if (authIdentity.HasPermission(requirement.Permission))
            {
                context.Succeed(requirement);
            }
            else
            {
                context.Fail(new AuthorizationFailureReason(this, $"Current user does not have {requirement.Permission} permission"));
            }

            return Task.CompletedTask;
        }
    }
}
