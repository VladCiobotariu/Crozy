using System.Security.Claims;
using Crozy.Domain.Categories;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Organisations;
using Crozy.GraphQL.Types;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.Categories
{

    [ExtendObjectType(GraphQLTypes.Mutation)]
    public class CategoryMutations
    {
        [HotChocolate.Authorization.Authorize(Policy = Policies.CanCreateOrgEntities)]
        public async Task<AddCategoryPayload> AddCategoryAsync(
            AddCategoryInput input, 
            [GlobalState(OrganisationsConst.OrganisationId)] long organisationId,
            ICategoryRepository categoryRepository,
            CancellationToken cancellationToken)
        {
            var category = new Category(input.name, input.slug, organisationId, input.displayNumber, input.description);

            categoryRepository.Add(category);
            await categoryRepository.SaveChangesAsync(cancellationToken);

            return new AddCategoryPayload(category);
        }

        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<UpdateCategoryPayload> UpdateCategoryAsync(
            UpdateCategoryInput input,
            IAuthorizationService authorizationService,
            ICategoryRepository categoryRepository,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var category = await categoryRepository.GetByIdAsync(input.Id, cancellationToken);
            if (category is null)
            {
                return new UpdateCategoryPayload(new[]
                    { new UserError("Category with given ID does not exist", "CATEGORY_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [category], Policies.CanEditOrgEntities);
            if (authorizationFailed)
            {
                return new UpdateCategoryPayload(errors);
            }

            category.UpdateCategory(newName: input.Name, newSlug: input.Slug, newDescription: input.Description, newDisplayNumber: input.DisplayNumber);

            await categoryRepository.SaveChangesAsync(cancellationToken);

            return new UpdateCategoryPayload(category);
        }

        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<DeleteCategoryPayload> DeleteCategoryAsync(
            DeleteCategoryInput input,
            IAuthorizationService authorizationService,
            ICategoryRepository categoryRepository,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var category = await categoryRepository.GetByIdAsync(input.Id, cancellationToken);
            if (category is null)
            {
                return new DeleteCategoryPayload(new[]
                    { new UserError("Category with given ID does not exist", "CATEGORY_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [category], Policies.CanDeleteOrgEntities);
            if (authorizationFailed)
            {
                return new DeleteCategoryPayload(errors);
            }

            

            categoryRepository.Remove(category);
            await categoryRepository.SaveChangesAsync(cancellationToken);

            return new DeleteCategoryPayload(true);
        }
    }
}