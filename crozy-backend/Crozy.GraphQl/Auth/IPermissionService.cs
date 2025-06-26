using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Crozy.GraphQL.Auth
{
    public interface IPermissionService
    {
        Task<ClaimsIdentity?> GetSellerPermissionsIdentityAsync(string userExternalId, long organisationId, CancellationToken cancellationToken = default);

        Task<ClaimsIdentity?> GetBuyerPermissionsIdentityAsync(string userExternalId, CancellationToken cancellationToken = default);
        Task<ClaimsIdentity?> GetSellerPermissionsIdentityForDefaultOrganisationAsync(string userExternalId, CancellationToken cancellationToken = default);
    }
}
