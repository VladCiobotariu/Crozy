using System.Security.Claims;
using Crozy.Domain.Products;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Clients;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Types;
using Crozy.Domain.Services;
using Crozy.GraphQL.Organisations;
using Crozy.Domain.Sites;
using Microsoft.AspNetCore.Authorization;
using Crozy.Domain.Categories;
using Crozy.Domain.ExtraOptions;
using Crozy.Domain;
using Crozy.Domain.Moneys;
using Crozy.Infrastructure.Repositories;

namespace Crozy.GraphQL.Products
{

    [ExtendObjectType(GraphQLTypes.Mutation)]
    public class ProductMutations
    {
        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<AddProductPayload> AddProductAsync(
            AddProductInput input,
            [GlobalState(OrganisationsConst.OrganisationId)] long organisationId,
            ICategoryRepository categoryRepository,
            IAuthorizationService authorizationService,
            ISiteRepository siteRepository,
            IProductRepository productRepository,
            IExtraOptionRepository extraOptionRepository,
            IMediaServiceClient mediaService,
            IRandomNumberGeneratorService randomNumberGeneratorService,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            
            var site = await siteRepository.GetByIdAsync(input.siteId, cancellationToken);

            if (site is null)
            {
                return new AddProductPayload(new[] { new UserError("Site with given ID does not exists", "SITE_NOT_FOUND") });
            }

            ExtraOption[] extraOptions = await extraOptionRepository.GetByIdsAsync(input.extraOptionIds, cancellationToken);
            Category[] categories = await categoryRepository.GetByIdsAsync(input.categoryIds, cancellationToken);

            List<IOrganisationEntity> resources = [site];
            resources.AddRange(categories);
            resources.AddRange(extraOptions);

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, resources, Policies.CanEditOrgEntities);

            if (authorizationFailed)
            {
                return new AddProductPayload(errors);
            }

            string? uniqueImageName = null;
            if (input.image != null)
            {
                uniqueImageName =
                    $"{site.Slug}-{input.slug}-{randomNumberGeneratorService.GenerateRandomNumber()}{System.IO.Path.GetExtension(input.image)}";
            }

            var product = new Product(
                input.name, 
                input.siteId, 
                new Money(input.price, input.currency), 
                input.slug, 
                organisationId,
                extraOptions,
                input.description, 
                uniqueImageName);

            foreach (var categoryId in categories.Select(x=>x.Id))
            {
                product.AddCategory(categoryId);
            }

            productRepository.Add(product);
            await productRepository.SaveChangesAsync(cancellationToken);

            if (uniqueImageName != null && input.image != null)
            {
                await mediaService.CreateProductImageAsync(input.image, uniqueImageName, cancellationToken);
            }

            return new AddProductPayload(product);
        }

        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<UpdateProductPayload> UpdateProductAsync(
            UpdateProductInput input,
            IAuthorizationService authorizationService,
            IProductRepository productRepository,
            ISiteRepository siteRepository,
            IMediaServiceClient mediaService,
            IRandomNumberGeneratorService randomNumberGeneratorService,
            ICategoryRepository categoryRepository,
            IExtraOptionRepository extraOptionRepository,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var product = await productRepository.GetByIdAsync(input.id, cancellationToken);
            if (product is null)
            {
                return new UpdateProductPayload([new UserError("Product with given ID does not exists", "PRODUCT_NOT_FOUND")]);
            }
            var site = await siteRepository.GetByIdAsync(input.siteId, cancellationToken);
            if (site is null)
            {
                return new UpdateProductPayload([new UserError("Site with given ID does not exists", "SITE_NOT_FOUND")]);
            }

            ExtraOption[] extraOptions = await extraOptionRepository.GetByIdsAsync(input.extraOptionIds, cancellationToken);
            Category[] categories = await categoryRepository.GetByIdsAsync(input.categoryIds, cancellationToken);

            List<IOrganisationEntity> resources = [product, site];
            resources.AddRange(categories);
            resources.AddRange(extraOptions);

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, resources, Policies.CanEditOrgEntities);

            if (authorizationFailed)
            {
                return new UpdateProductPayload(errors);
            }

            string? newImage = product.Image;

            if (product.Image != null && input.image == null)
            {
                await mediaService.DeleteImageAsync(product.Image, cancellationToken);
                newImage = null;
            }

            if (newImage == null && input.image != null)
            {
                newImage =
                    $"{site.Slug}-{input.slug}-{randomNumberGeneratorService.GenerateRandomNumber()}{System.IO.Path.GetExtension(input.image)}";
            }
            else if (newImage != input.image && input.image != null && newImage != null)
            {
                newImage =
                    $"{site.Slug}-{input.slug}-{randomNumberGeneratorService.GenerateRandomNumber()}{System.IO.Path.GetExtension(input.image)}";
            }

            product.UpdateProduct(
                name: input.name,
                price: new Money(input.price, input.currency),
                slug: input.slug,
                description: input.description,
                image: newImage,
                extraOptions);

            await productRepository.SaveChangesAsync(cancellationToken);
            if (product.Image != input.image && input.image != null && product.Image != null)
            {
                await mediaService.UpdateProductImageAsync(input.image, product.Image, cancellationToken);
            }
            return new UpdateProductPayload(product);
        }
        
        [HotChocolate.Authorization.Authorize(Policy = Policies.IsSeller)]
        public async Task<DeleteProductPayload> DeleteProductAsync (
            DeleteProductInput input,
            IAuthorizationService authorizationService,
            ClaimsPrincipal user,
            IProductRepository productRepository,
            CancellationToken cancellationToken)
        {
            var product = await productRepository.GetByIdAsync(input.Id, cancellationToken);
            if (product is null)
            {
                return new DeleteProductPayload(new[] { new UserError("Product with given ID does not exist", "PRODUCT_NOT_FOUND") });
            }

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [product], Policies.CanDeleteOrgEntities);
            if (authorizationFailed)
            {
                return new DeleteProductPayload(errors);
            }
            
            productRepository.Remove(product);
            await productRepository.SaveChangesAsync(cancellationToken);

            return new DeleteProductPayload(true);
        }
    }
}
