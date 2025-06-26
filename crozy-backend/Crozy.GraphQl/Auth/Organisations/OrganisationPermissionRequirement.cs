using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.Auth.Organisations
{
    public class OrganisationPermissionRequirement : IAuthorizationRequirement
    {
        public OrganisationPermissionRequirement(string permission)
        {
            Permission = permission;
        }

        public string Permission { get; }
    }
}
