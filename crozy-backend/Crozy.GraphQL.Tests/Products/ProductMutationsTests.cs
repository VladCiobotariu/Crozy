using System.Security.Claims;
using AutoFixture;
using Crozy.Domain;
using Crozy.Domain.Categories;
using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Products;
using Crozy.Domain.Services;
using Crozy.Domain.Sites;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Clients;
using Crozy.GraphQL.Products;
using Microsoft.AspNetCore.Authorization;
using Moq;

namespace Crozy.GraphQL.Tests.Products
{
    public class ProductMutationsTests
    {
        Mock<ISiteRepository> siteRepositoryMock = new Mock<ISiteRepository>();
        Mock<IProductRepository> productRepository = new Mock<IProductRepository>();
        Mock<IMediaServiceClient> mediaService = new Mock<IMediaServiceClient>();
        Mock<ICategoryRepository> categoryRepository = new Mock<ICategoryRepository>();
        Mock<IExtraOptionRepository> extraOptionRepository = new Mock<IExtraOptionRepository>();
        private Mock<IAuthorizationService> authorizationService = new Mock<IAuthorizationService>();
        private Mock<IRandomNumberGeneratorService> randomGeneratorService = new Mock<IRandomNumberGeneratorService>();
        CancellationToken cancellationToken = new CancellationToken();
        Fixture fixture = new Fixture();

        [Fact]
        public async Task AddProduct_returns_validation_error_for_invalid_siteid()
        {
            // Arrange
            var sut = new ProductMutations();
            var input = fixture.Create<AddProductInput>();
            var claimsPrincipal = new ClaimsPrincipal();
            long organisationId = 1;
            
            // Act
            AddProductPayload result = await sut.AddProductAsync(
                input, 
                organisationId,
                categoryRepository.Object,
                authorizationService.Object,
                siteRepositoryMock.Object, 
                productRepository.Object,
                extraOptionRepository.Object,
                mediaService.Object,
                randomGeneratorService.Object,
                claimsPrincipal,
                cancellationToken
                );

            // Assert
            Assert.NotNull(result.Errors);
            Assert.Single(result.Errors);
            Assert.Equal("Site with given ID does not exists", result.Errors[0].Message);
        }

        [Fact]
        public async Task AddProduct_creates_unique_image_name()
        {
            // Arrange
            string siteSlug = "best-coffe-shop";
            string productSlug = "capucino";
            string imageExtension = "jpg";
            string imageName = $"test-image-name.{imageExtension}";
            long siteId = 1;
            long organisationId = 1;
            var claimsPrincipal = new ClaimsPrincipal();

            var sut = new ProductMutations();

            AddProductInput input = fixture
                .Build<AddProductInput>()
                .With(x => x.siteId, siteId)
                .With(x => x.slug, productSlug)
                .With(x => x.image, imageName)
                .Create();

            Site site = new Site("Best Coffe Shop", siteSlug, 1);

            Category[] categories = [new Category("coffe", "coffe", organisationId, 0)]; 
            
            categoryRepository
                .Setup(x => x.GetByIdsAsync(It.IsAny<long[]>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(categories);
            
            extraOptionRepository
                .Setup(x => x.GetByIdsAsync(It.IsAny<long[]>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync([]);

            siteRepositoryMock
                .Setup(x => x.GetByIdAsync(siteId, cancellationToken))
                .ReturnsAsync(site);

            randomGeneratorService
                .Setup(x => x.GenerateRandomNumber())
                .Returns(123);

            authorizationService
                .Setup(x => x.AuthorizeAsync(claimsPrincipal, It.IsAny<object?>(), Policies.CanEditOrgEntities))
                .ReturnsAsync(AuthorizationResult.Success());

            // Act
            AddProductPayload result = await sut.AddProductAsync(
                input,
                organisationId,
                categoryRepository.Object,
                authorizationService.Object,
                siteRepositoryMock.Object,
                productRepository.Object,
                extraOptionRepository.Object,
                mediaService.Object,
                randomGeneratorService.Object,
                claimsPrincipal,
                cancellationToken
                );

            // Assert
            Assert.Null(result.Errors);
            Assert.NotNull(result.Product);
            Assert.Equal($"{siteSlug}-{productSlug}-{123}.{imageExtension}", result.Product.Image);
        }
    }
}
