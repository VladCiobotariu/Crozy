using Crozy.Domain.Sites;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Organisations;
using Crozy.GraphQL.Types;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Crozy.GraphQL.Sites
{
    [ExtendObjectType(GraphQLTypes.Mutation)]
    public class SiteMutations
    {
        [HotChocolate.Authorization.Authorize(Policy = Policies.CanCreateOrgEntities)]
        public async Task<AddSitePayload> AddSiteAsync(
            AddSiteInput input,
            [GlobalState(OrganisationsConst.OrganisationId)] long organisationId,
            ISiteRepository repository, 
            CancellationToken cancellationToken)
        {
            var site = new Site(input.name, input.slug, organisationId);

            repository.Add(site);
            await repository.SaveChangesAsync(cancellationToken);

            return new AddSitePayload(site);
        }

        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<UpdateSitePayload> UpdateSiteAsync(
            UpdateSiteInput input,
            IAuthorizationService authorizationService,
            ClaimsPrincipal user,
            ISiteRepository siteRepository,
            CancellationToken cancellationToken)
        {
            var site = await siteRepository.GetByIdAsync(input.Id, cancellationToken);

            if(site is null)
            {
                return new UpdateSitePayload(new[] { new UserError("Site with given ID does not exist", "SITE_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [site], Policies.CanEditOrgEntities);
            if (authorizationFailed)
            {
                return new UpdateSitePayload(errors);
            }

            site.Name = input.Name;
            site.Slug = input.Slug;

            await siteRepository.SaveChangesAsync(cancellationToken);

            return new UpdateSitePayload(site);
        }

        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<DeleteSitePayload> DeleteSiteAsync(
            DeleteSiteInput input,
            IAuthorizationService authorizationService,
            ClaimsPrincipal user,
            ISiteRepository siteRepository,
            CancellationToken cancellationToken)
        {
            var site = await siteRepository.GetByIdAsync(input.Id, cancellationToken);

            if (site is null)
            {
                return new DeleteSitePayload(new[] { new UserError("Site with given ID does not exist", "SITE_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [site], Policies.CanDeleteOrgEntities);
            if (authorizationFailed)
            {
                return new DeleteSitePayload(errors);
            }

            siteRepository.Remove(site);
            await siteRepository.SaveChangesAsync(cancellationToken);

            return new DeleteSitePayload(true);
        }
    }
}
