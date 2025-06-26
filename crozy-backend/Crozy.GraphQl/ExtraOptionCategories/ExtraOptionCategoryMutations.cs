using System.Security.Claims;
using Crozy.Domain.ExtraOptionCategories;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Organisations;
using Crozy.GraphQL.Types;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.ExtraOptionCategories
{
    [ExtendObjectType(GraphQLTypes.Mutation)]
    public class ExtraOptionCategoryMutations
    {
        [HotChocolate.Authorization.Authorize(Policy = Policies.CanCreateOrgEntities)]
        public async Task<AddExtraOptionCategoryPayload> AddExtraOptionCategory(
            AddExtraOptionCategoryInput input,
            [GlobalState(OrganisationsConst.OrganisationId)] long organisationId,
            IExtraOptionCategoryRepository extraOptionCategoryRepository,
            CancellationToken cancellationToken)
        {
            var category = new ExtraOptionCategory(input.Name, organisationId);
            extraOptionCategoryRepository.Add(category);

            await extraOptionCategoryRepository.SaveChangesAsync(cancellationToken);

            return new AddExtraOptionCategoryPayload(category);
        }
        
        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<UpdateExtraOptionCategoryPayload> UpdateExtraOptionCategoryAsync(
            UpdateExtraOptionCategoryInput input,
            IAuthorizationService authorizationService,
            IExtraOptionCategoryRepository extraOptionCategoryRepository,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var extraOptionCategory = await extraOptionCategoryRepository.GetByIdAsync(input.Id, cancellationToken);
            if (extraOptionCategory is null)
            {
                return new UpdateExtraOptionCategoryPayload(new[]
                    { new UserError("Extra Option Category with given ID does not exist", "EXTRA_OPTION_CATEGORY_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [extraOptionCategory], Policies.CanEditOrgEntities);
            if (authorizationFailed)
            {
                return new UpdateExtraOptionCategoryPayload(errors);
            }

            extraOptionCategory.Update(name: input.Name);

            await extraOptionCategoryRepository.SaveChangesAsync(cancellationToken);

            return new UpdateExtraOptionCategoryPayload(extraOptionCategory);
        }
        
        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<DeleteExtraOptionCategoryPayload> DeleteExtraOptionCategoryAsync(
            DeleteExtraOptionCategoryInput input,
            IAuthorizationService authorizationService,
            IExtraOptionCategoryRepository extraOptionCategoryRepository,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var extraOptionCategory = await extraOptionCategoryRepository.GetByIdAsync(input.Id, cancellationToken);
            if (extraOptionCategory is null)
            {
                return new DeleteExtraOptionCategoryPayload(new[]
                    { new UserError("Extra Option Category with given ID does not exist", "EXTRA_OPTION_CATEGORY_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [extraOptionCategory], Policies.CanDeleteOrgEntities);
            if (authorizationFailed)
            {
                return new DeleteExtraOptionCategoryPayload(errors);
            }

            extraOptionCategoryRepository.Remove(extraOptionCategory);
            await extraOptionCategoryRepository.SaveChangesAsync(cancellationToken);

            return new DeleteExtraOptionCategoryPayload(true);
        }
    }
}
