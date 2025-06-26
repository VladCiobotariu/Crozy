using System.Security.Claims;
using Crozy.Domain.ExtraOptions;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.DataLoader;
using Crozy.GraphQL.Organisations;
using Crozy.GraphQL.Types;
using Crozy.Infrastructure;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.ExtraOptions
{
    [ExtendObjectType(GraphQLTypes.Query)]
    public class ExtraOptionQueries
    {
        
        public IQueryable<ExtraOption> GetAllExtraOptionsForCurrentOrganisation(CrozyDbContext context, [GlobalState(OrganisationsConst.OrganisationId)] long organisationId)
        {
            return context.ExtraOptions.Where(x => x.OrganisationId == organisationId);
        }
        
        [UsePaging(IncludeTotalCount = true)]
        [UseSorting]
        public IQueryable<ExtraOption> GetExtraOptionsForCurrentOrganisation(CrozyDbContext context, [GlobalState(OrganisationsConst.OrganisationId)] long organisationId)
        {
            return context.ExtraOptions.Where(x => x.OrganisationId == organisationId);
        }
        
        public async Task<ExtraOptionByIdPayload> GetExtraOptionByIdAsync(
            [ID(nameof(ExtraOption))] long id,
            ExtraOptionByIdLoader extraOptionById,
            IAuthorizationService authorizationService,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var extraOption = await extraOptionById.LoadAsync(id, cancellationToken);
            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [extraOption], Policies.CanReadOrgEntities);
            if (authorizationFailed)
            {
                return new ExtraOptionByIdPayload(errors);
            }

            return new ExtraOptionByIdPayload(extraOption);
        }
    }
}
