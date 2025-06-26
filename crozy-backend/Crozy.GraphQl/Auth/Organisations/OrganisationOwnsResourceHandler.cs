using System.Resources;
using System.Security.Claims;
using Crozy.Domain;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.Auth.Organisations
{
    public class OrganisationOwnsResourceHandler : AuthorizationHandler<OrganisationOwnsResourceRequirement, IReadOnlyCollection<IOrganisationEntity>>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OrganisationOwnsResourceRequirement requirement, IReadOnlyCollection<IOrganisationEntity> resources)
        {
            ClaimsIdentity? authIdentity = context.User.GetSellerAuthIdentity();
            
            long? organisationId = authIdentity?.GetOrganisationId();

            if (organisationId == null)
            {
                context.Fail(new AuthorizationFailureReason(this, "Current user does not have any organisation"));
                return Task.CompletedTask;
            }

            if (resources.All(x => x.OrganisationId == organisationId))
            {
                context.Succeed(requirement);
            }
            else
            {
                context.Fail(new AuthorizationFailureReason(this, "Org entities do not belong to current organisation"));
            }

            return Task.CompletedTask;
        }
    }
}
