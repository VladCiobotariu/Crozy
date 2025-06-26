using System.Security.Claims;
using Crozy.Domain.ExtraOptionCategories;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.DataLoader;
using Crozy.GraphQL.Organisations;
using Crozy.GraphQL.Types;
using Crozy.Infrastructure;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.ExtraOptionCategories;

[ExtendObjectType(GraphQLTypes.Query)]
public class ExtraOptionCategoryQueries
{
    [UsePaging(IncludeTotalCount = true)]
    [UseSorting]
    public IQueryable<ExtraOptionCategory> GetAllExtraOptionsCategoriesForCurrentOrganisation(CrozyDbContext context, [GlobalState(OrganisationsConst.OrganisationId)] long organisationId)
    {
        return context.ExtraOptionCategories.Where(x => x.OrganisationId == organisationId);
    }

    public async Task<ExtraOptionCategoryByIdPayload> GetExtraOptionCategoryByIdAsync(
        [ID(nameof(ExtraOptionCategory))] long id,
        ExtraOptionCategoryByIdDataLoader extraOptionCategoryById,
        IAuthorizationService authorizationService,
        ClaimsPrincipal user,
        CancellationToken cancellationToken)
    {
        var extraOptionCategory = await extraOptionCategoryById.LoadAsync(id, cancellationToken);
        var (authorizationFailed, errors) =
            await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [extraOptionCategory], Policies.CanReadOrgEntities);
        if (authorizationFailed)
        {
            return new ExtraOptionCategoryByIdPayload(errors);
        }

        return new ExtraOptionCategoryByIdPayload(extraOptionCategory);
    }
}