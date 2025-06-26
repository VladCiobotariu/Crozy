using System.Security.Claims;

namespace Crozy.GraphQL.Auth
{
    public static class AuthExtensions
    {
        public static ClaimsIdentity? GetSellerAuthIdentity(this ClaimsPrincipal principal)
        {
            return principal.Identities.FirstOrDefault(x => x.NameClaimType == Identities.Seller && x.AuthenticationType == nameof(PermissionService));
        }
        
        public static ClaimsIdentity? GetBuyerAuthIdentity(this ClaimsPrincipal principal)
        {
            return principal.Identities.FirstOrDefault(x => x.NameClaimType == Identities.Buyer && x.AuthenticationType == nameof(PermissionService));
        }

        public static bool HasPermission(this ClaimsIdentity identity, string permission)
        {
            return identity.HasClaim(x => x.Type == Claims.Permission && x.Value == permission);
        }

        public static long? GetOrganisationId(this ClaimsIdentity identity)
        {
            Claim? organisationIdClaim = identity.Claims.FirstOrDefault(x => x.Type == Claims.Organisation);
            if (organisationIdClaim == null)
            {
                return null;
            }

            if (long.TryParse(organisationIdClaim.Value, out var organisationId))
            {
                return organisationId;
            }
            return null;
        }

        public static bool NoSeller(this ClaimsIdentity identity)
        {
            Claim? internalIdClaim = identity.Claims.FirstOrDefault(x => x.Type == Claims.NoSeller);
            return internalIdClaim is null  || internalIdClaim.Value == true.ToString();
        }
        
        public static bool NoBuyer(this ClaimsIdentity identity)
        {
            Claim? internalIdClaim = identity.Claims.FirstOrDefault(x => x.Type == Claims.NoBuyer);
            return internalIdClaim is null  || internalIdClaim.Value == true.ToString();
        }

        public static long? GetBuyerId(this ClaimsIdentity identity)
        {
            Claim? internalIdClaim = identity.Claims.FirstOrDefault(x => x.Type == Claims.InternalBuyerId);
            if (internalIdClaim == null)
            {
                return null;
            }

            if (long.TryParse(internalIdClaim.Value, out var buyerId))
            {
                return buyerId;
            }
            return null;
        }
        
        public static long? GetSellerId(this ClaimsIdentity identity)
        {
            Claim? sellerIdClaim = identity.Claims.FirstOrDefault(x => x.Type == Claims.InternalSellerId);
            if (sellerIdClaim == null)
            {
                return null;
            }

            if (long.TryParse(sellerIdClaim.Value, out var sellerId))
            {
                return sellerId;
            }
            return null;
        }
        
        public static long? GetUserId(this ClaimsIdentity identity)
        {
            Claim? sellerIdClaim = identity.Claims.FirstOrDefault(x => x.Type == Claims.InternalUserId);
            if (sellerIdClaim == null)
            {
                return null;
            }

            if (long.TryParse(sellerIdClaim.Value, out var sellerId))
            {
                return sellerId;
            }
            return null;
        }
        
        public static long? GetUserId(this ClaimsPrincipal principal)
        {
            ClaimsIdentity? identity = principal.Identities.FirstOrDefault(x =>
                (x.NameClaimType == Identities.Seller || x.NameClaimType == Identities.Buyer) &&
                x.AuthenticationType == nameof(PermissionService));
            if (identity is null)
            {
                return null;
            }
            
            Claim? sellerIdClaim = identity.Claims.FirstOrDefault(x => x.Type == Claims.InternalUserId);
            if (sellerIdClaim == null)
            {
                return null;
            }

            if (long.TryParse(sellerIdClaim.Value, out var sellerId))
            {
                return sellerId;
            }
            return null;
        }
        
        public static long? GetBuyerId(this ClaimsPrincipal claimsPrincipal)
        {
            ClaimsIdentity? buyer = claimsPrincipal.GetBuyerAuthIdentity();
            var buyerId = buyer?.GetBuyerId();
            return buyerId;
        }
        
        public static long? GetSellerId(this ClaimsPrincipal claimsPrincipal)
        {
            ClaimsIdentity? seller = claimsPrincipal.GetSellerAuthIdentity();
            var buyerId = seller?.GetSellerId();
            return buyerId;
        }
        
        public static string? GetExternalId(this ClaimsPrincipal claimsPrincipal)
        {
            Claim? externalIdClaim = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == Claims.ExternalId);
            if (externalIdClaim == null)
            {
                return null;
            }

            var externalId = externalIdClaim.Value;
            if (string.IsNullOrEmpty(externalId))
            {
                return null;
            }
            return externalId;
        }

        public static string? GetGivenName(this ClaimsPrincipal claimsPrincipal)
        {
            Claim? givenNameClaim = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.GivenName);
            if (givenNameClaim == null)
            {
                return null;
            }

            var givenName = givenNameClaim.Value;
            if (string.IsNullOrEmpty(givenName))
            {
                return null;
            }

            return givenName;
        }

        public static string? GetSurname(this ClaimsPrincipal claimsPrincipal)
        {
            Claim? surnameClaim = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Surname);
            if (surnameClaim == null)
            {
                return null;
            }

            var surname = surnameClaim.Value;
            if (string.IsNullOrEmpty(surname))
            {
                return null;
            }

            return surname;
        }

        public static string? GetEmail(this ClaimsPrincipal claimsPrincipal)
        {
            Claim? emailClaim = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == "emails");
            if (emailClaim == null)
            {
                return null;
            }

            var email = emailClaim.Value;
            if (string.IsNullOrEmpty(email))
            {
                return null;
            }

            return email;
        }
    }
}
