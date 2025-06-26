using System.Security.Claims;
using Crozy.Domain.ExtraOptions;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Organisations;
using Crozy.GraphQL.Types;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.ExtraOptions
{
    [ExtendObjectType(GraphQLTypes.Mutation)]
    public class ExtraOptionMutations
    {
        [HotChocolate.Authorization.Authorize(Policy = Policies.CanCreateOrgEntities)]
        public async Task<AddExtraOptionPayload> AddExtraOption(
            AddExtraOptionInput input,
            [GlobalState(OrganisationsConst.OrganisationId)] long organisationId,
            IExtraOptionRepository extraOptionRepository,
            CancellationToken cancellationToken)
        {
            var extraOption = new ExtraOption(
                input.Name, 
                input.Price, 
                organisationId: organisationId, 
                extraOptionCategoryId: input.ExtraOptionCategoryId);

            extraOptionRepository.Add(extraOption);

            await extraOptionRepository.SaveChangesAsync(cancellationToken);

            return new AddExtraOptionPayload(extraOption);
        }
        
        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<UpdateExtraOptionPayload> UpdateExtraOptionAsync(
            UpdateExtraOptionInput input,
            IAuthorizationService authorizationService,
            IExtraOptionRepository extraOptionRepository,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var extraOption = await extraOptionRepository.GetByIdAsync(input.Id, cancellationToken);
            if (extraOption is null)
            {
                return new UpdateExtraOptionPayload(new[]
                    { new UserError("Extra Option with given ID does not exist", "EXTRA_OPTION_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [extraOption], Policies.CanEditOrgEntities);
            if (authorizationFailed)
            {
                return new UpdateExtraOptionPayload(errors);
            }

            extraOption.Update(name: input.Name, price: input.Price, extraOptionCategoryId: input.ExtraOptionCategoryId);

            await extraOptionRepository.SaveChangesAsync(cancellationToken);

            return new UpdateExtraOptionPayload(extraOption);
        }
        
        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<DeleteExtraOptionPayload> DeleteExtraOptionAsync(
            DeleteExtraOptionInput input,
            IAuthorizationService authorizationService,
            IExtraOptionRepository extraOptionRepository,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var extraOption = await extraOptionRepository.GetByIdAsync(input.Id, cancellationToken);
            if (extraOption is null)
            {
                return new DeleteExtraOptionPayload(new[]
                    { new UserError("Extra Option with given ID does not exist", "EXTRA_OPTION_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [extraOption], Policies.CanDeleteOrgEntities);
            if (authorizationFailed)
            {
                return new DeleteExtraOptionPayload(errors);
            }

            extraOptionRepository.Remove(extraOption);
            await extraOptionRepository.SaveChangesAsync(cancellationToken);

            return new DeleteExtraOptionPayload(true);
        }
    }
}
