using System.Security.Claims;
using AutoFixture;
using Crozy.Domain.Buyers;
using Crozy.Domain.Orders;
using Crozy.Domain.Services;
using Crozy.Domain.Sites;
using Crozy.Domain;
using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Products;
using Crozy.GraphQL.Orders;
using Moq;

namespace Crozy.GraphQL.Tests.Order;

public class OrderMutationsTests
{
    Mock<ISiteRepository> siteRepository = new Mock<ISiteRepository>();
    Mock<IProductRepository> productRepository = new Mock<IProductRepository>();
    Mock<IOrderRepository> orderRepository = new Mock<IOrderRepository>();
    Mock<INotificationService> notificationService = new Mock<INotificationService>();
    Mock<IOrderNumberProvider> orderNumberProvider = new Mock<IOrderNumberProvider>();
    Mock<IExtraOptionRepository> extraOptionRepository = new Mock<IExtraOptionRepository>();
    CancellationToken cancellationToken = new CancellationToken();
    Fixture fixture = new Fixture();

    [Fact]
    public async Task AddOrder_returns_validation_error_with_no_items()
    {
        // Arrange
        long siteId = 1;
        CustomerDetailsInput customerDetailsInput =
            new CustomerDetailsInput("Vlad", "C", "test@gmail.com", "+40777711333");
        Address shippingAddress = new Address("Romania", "Timis", "Timisoara", "Cucosilor nr 5");
        
        var sut = new OrderMutations();
        var input = fixture
            .Build<AddOrderInput>()
            .With(x => x.siteId, siteId)
            .With(x=>x.items, Array.Empty<AddOrderItem>())
            .With(x=>x.customerDetails, customerDetailsInput)
            .With(x=>x.shippingAddress, shippingAddress)
            .Create();
        
        Site site = new Site("Coffee Shop", "coffee-shop", 1);

        siteRepository
            .Setup(x => x.GetByIdAsync(siteId, cancellationToken))
            .ReturnsAsync(site);
        
        var claimsPrincipal = new ClaimsPrincipal();
        
        // Act
        AddOrderPayload result = await sut.AddOrderForMeAsync(
            input,
            orderRepository.Object,
            notificationService.Object,
            siteRepository.Object,
            productRepository.Object,
            orderNumberProvider.Object,
            extraOptionRepository.Object,
            claimsPrincipal,
            cancellationToken);
        
        // Assert
        Assert.NotNull(result.Errors);
        Assert.Single(result.Errors);
        Assert.Equal("No items found", result.Errors[0].Message);
    }
}