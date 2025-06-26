using System.Security.Claims;
using Crozy.Domain.Users;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Types;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.Users;

[ExtendObjectType(GraphQLTypes.Query)]
public class UserQueries
{
    
    [HotChocolate.Authorization.Authorize]
    public async Task<QueryUserPayload> GetUserByIdAsync(
        [ID(nameof(User))] long id,
        IUserRepository userRepository,
        IAuthorizationService authorizationService,
        ClaimsPrincipal user,
        CancellationToken cancellationToken)
    {
        var queriedUser = await userRepository.GetUserByIdAsync(id, cancellationToken);
        if (queriedUser is null)
        {
            return new QueryUserPayload(new[] { new UserError("User not found.", "NOT_FOUND") });
        }

        return new QueryUserPayload(queriedUser);
    }

    [HotChocolate.Authorization.Authorize]
    public async Task<QueryUserPayload> GetUserByExternalIdAsync(
        string externalId,
        IUserRepository userRepository,
        IAuthorizationService authorizationService,
        ClaimsPrincipal user,
        CancellationToken cancellationToken)
    {
        var queriedUser = await userRepository.GetUserByExternalIdAsync(externalId, cancellationToken);
        if (queriedUser is null)
        {
            return new QueryUserPayload(new[] { new UserError("User not found.", "NOT_FOUND") });
        }

        return new QueryUserPayload(queriedUser);
    }
    
    [HotChocolate.Authorization.Authorize]
    public async Task<QueryUserPayload> GetMyUserAsync(
        IUserRepository userRepository,
        IAuthorizationService authorizationService,
        ClaimsPrincipal user,
        CancellationToken cancellationToken)
    {
        var externalId = user.GetExternalId();
        if (externalId is null)
        {
            return new QueryUserPayload(new[] { new UserError("ExternalId claim not found.", "NOT_FOUND") });
        }
        
        var queriedUser = await userRepository.GetUserByExternalIdAsync(externalId, cancellationToken);
        if (queriedUser is null)
        {
            return new QueryUserPayload(new[] { new UserError("User not found.", "NOT_FOUND") });
        }

        return new QueryUserPayload(queriedUser);
    }
}