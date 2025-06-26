using System.Security.Claims;
using Crozy.GraphQL.Auth;
using Microsoft.Identity.Web;

namespace Crozy.GraphQL.Tests.Factories;

public class ClaimFactory
{
    public static ClaimsPrincipal CreateValid(
        long organisationId = 1,
        string scope = Claims.Shopping,
        params string[] claims
    )
    {
        var claimsPrincipal = new ClaimsPrincipal();
        var claimsIdentity = new ClaimsIdentity();

        Claim[] claimsToAdd = claims.Select(x => new Claim(Claims.Permission, x))
            .Append(new Claim(ClaimConstants.Scope, scope))
            .Append(new Claim(Claims.Organisation, organisationId.ToString()))
            .ToArray();
        claimsIdentity.AddClaims(claimsToAdd);
        claimsPrincipal.AddIdentity(claimsIdentity);

        return claimsPrincipal;
    }
}