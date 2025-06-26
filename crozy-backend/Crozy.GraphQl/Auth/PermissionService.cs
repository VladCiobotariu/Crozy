using Crozy.Domain.Sellers;
using System.Security.Claims;
using Crozy.Domain.Buyers;
using Crozy.Domain.Users;

namespace Crozy.GraphQL.Auth
{
    public class PermissionService : IPermissionService
    {
        private readonly ISellerRepository sellerRepository;
        private readonly IBuyerRepository buyerRepository;
        private readonly IUserRepository userRepository;

        public PermissionService(ISellerRepository sellerRepository, IBuyerRepository buyerRepository, IUserRepository userRepository)
        {
            this.sellerRepository = sellerRepository;
            this.buyerRepository = buyerRepository;
            this.userRepository = userRepository;
        }
        
        public async Task<ClaimsIdentity?> GetBuyerPermissionsIdentityAsync(string userExternalId,
            CancellationToken cancellationToken = default)
        {
            Buyer? buyer = await buyerRepository.GetBuyerByExternalIdAsync(userExternalId, cancellationToken);
            ClaimsIdentity claimsIdentity = BuildClaimsIdentityForBuyer(userExternalId, buyer);
            return claimsIdentity;
        }

        private ClaimsIdentity BuildClaimsIdentityForBuyer(string userExternalId, Buyer? buyer)
        {
            ClaimsIdentity authIdentity = new ClaimsIdentity(nameof(PermissionService), Identities.Buyer, Identities.Buyer);
            authIdentity.AddClaim(new Claim(Claims.ExternalId, userExternalId));
            authIdentity.AddClaim(new Claim(Claims.NoBuyer, (buyer is null).ToString()));

            if (buyer is not null)
            {
                authIdentity.AddClaim(new Claim(Claims.InternalUserId, buyer.UserId.ToString()));
                authIdentity.AddClaim(new Claim(Claims.InternalBuyerId, buyer.Id.ToString()));
            }

            return authIdentity;
        }

        public async Task<ClaimsIdentity?> GetSellerPermissionsIdentityForDefaultOrganisationAsync(string userExternalId, CancellationToken cancellationToken = default)
        {
            Seller? seller = await sellerRepository.GetFirstSellerWithExternalIdAsync(userExternalId, cancellationToken);
            ClaimsIdentity claimsIdentity = BuildClaimsIdentityForSeller(userExternalId, seller);
            return claimsIdentity;
        }

        public async Task<ClaimsIdentity?> GetSellerPermissionsIdentityAsync(string userExternalId, long organisationId, CancellationToken cancellationToken = default)
        {
            Seller? seller = await sellerRepository.GetSellerByExternalIdAsync(organisationId, userExternalId, cancellationToken);
            ClaimsIdentity claimsIdentity = BuildClaimsIdentityForSeller(userExternalId, seller);
            return claimsIdentity;
        }

        private ClaimsIdentity BuildClaimsIdentityForSeller(string userExternalId, Seller? seller)
        {
            ClaimsIdentity authIdentity = new ClaimsIdentity(nameof(PermissionService), Identities.Seller, Identities.Seller);
            authIdentity.AddClaim(new Claim(Claims.ExternalId, userExternalId));
            authIdentity.AddClaim(new Claim(Claims.NoSeller, (seller is null).ToString()));

            if (seller is not null)
            {
                var userId = seller.UserId.ToString();
                if (userId != null)
                {
                    authIdentity.AddClaim(new Claim(Claims.InternalUserId, userId));
                }
                authIdentity.AddClaim(new Claim(Claims.InternalSellerId, seller.Id.ToString()));
                authIdentity.AddClaim(new Claim(Claims.Organisation, seller.OrganisationId.ToString()));

                string[] permissions = GetPermissionsForRole(seller.Role);
                Claim[] permissionClaims = permissions.Select(x => new Claim(Claims.Permission, x)).ToArray();
                authIdentity.AddClaims(permissionClaims);
            }

            return authIdentity;
        }

        private string[] GetPermissionsForRole(Role role)
        => role switch
        {
            Role.Owner => [
                Permissions.ReadOrganisationEntity,
                Permissions.WriteOrganisationEntity,
                Permissions.DeleteOrganisation,
                Permissions.ProcessOrder,
                Permissions.DeliverOrder,
                Permissions.ManageUserAccess,
                Permissions.CanViewOrder,
                Permissions.CanViewUsers,
            ],
            Role.Admin => [
                Permissions.ReadOrganisationEntity,
                Permissions.WriteOrganisationEntity,
                Permissions.ProcessOrder,
                Permissions.DeliverOrder,
                Permissions.ManageUserAccess,
                Permissions.CanViewOrder,
                Permissions.CanViewUsers,
            ],
            Role.Seller => [
                Permissions.ReadOrganisationEntity,
                Permissions.ProcessOrder,
                Permissions.DeliverOrder,
                Permissions.CanViewOrder,
                Permissions.CanViewUsers,
            ],
            _ => []
        };
    }
}
