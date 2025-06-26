using System.Security.Claims;
using Crozy.Domain;
using Crozy.Domain.Orders;
using Crozy.GraphQL.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.IdentityModel.Tokens;

namespace Crozy.GraphQL.Auth;

public static class AuthorizationResultExtensions
{
    public static async Task<(bool Failed, UserError[] Result)> AuthorizeOrgEntityForGraphQlAsync(this IAuthorizationService authorizationService, ClaimsPrincipal user, IReadOnlyCollection<IOrganisationEntity> resources, string policyName)
    {
        var authorizationResult = await authorizationService.AuthorizeAsync(user, resources, policyName);
        return authorizationResult.AuthorizationFailed();
    }

    public static async Task<(bool Failed, UserError[] Result)> AuthorizeForGraphQlAsync(this IAuthorizationService authorizationService, ClaimsPrincipal user, object? resource, string policyName)
    {
        var authorizationResult = await authorizationService.AuthorizeAsync(user, resource, policyName);
        return authorizationResult.AuthorizationFailed();
    }

    public static (bool Failed, UserError[] Result) AuthorizationFailed(this AuthorizationResult authorizationResult)
    {
        if (authorizationResult.Succeeded) return (false, Array.Empty<UserError>());
        
        var errors = authorizationResult
            .Failure?
            .FailureReasons
            .Select(x => new UserError(x.Message, "NOT_AUTHORIZED"))
            .ToArray();

        return errors is null
            ? (true, [new UserError("User is not authorized for this resource.", "NOT_AUTHORIZED")])
            : (true, errors);
    }
}