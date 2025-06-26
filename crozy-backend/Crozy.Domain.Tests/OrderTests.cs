using Crozy.Domain.Moneys;
using Crozy.Domain.Orders;
using Crozy.Domain.Products;
using Crozy.Domain.Tests.Factories;

namespace Crozy.Domain.Tests
{
    public class OrderTests
    {
        public static IEnumerable<object[]> TestProducts
            => new List<object[]>
            {
                new object[] {ProductFactory.CreateValid(id: 1, price: 10), OrderFactory.CreateValid()},
                new object[] {ProductFactory.CreateValid(id: 1, price: 20), OrderFactory.CreateValid()},
            };

        [Theory]
        [MemberData(nameof(TestProducts))]
        public void DemoObjectParameters(Product product, Order order)
        {
            Assert.NotNull(product);
            Assert.NotNull(order);
        }

        [Fact]
        public void New_order_total_value_updated_when_product_added()
        {
            // Arrange
            long siteId = 1;

            var sut = OrderFactory.CreateValid(siteId: siteId);

            var product = ProductFactory.CreateValid(id: 1, siteId: siteId, price: 10, currency: Currency.RON);
            
            // Act
            sut.AddProduct(product, 1, []);

            // Assert
            Assert.Equal(new Money(10, Currency.RON), sut.TotalPrice);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        public void Order_does_not_accept_invalid_quantity(decimal invalidQuantity)
        {
            // Arrange
            long siteId = 1;

            var order = OrderFactory.CreateValid(siteId: siteId);

            var product = ProductFactory.CreateValid(id: 1, siteId: siteId, price: 10);
            // Act
            var exception = Assert.Throws<ArgumentException>(() => order.AddProduct(product, invalidQuantity, []));

            // Assert
            Assert.Equal("quantity", exception.ParamName);
            Assert.Equal("quantity must be grater than 0 (Parameter 'quantity')", exception.Message);
        }

        [Fact]
        public void Existing_order_total_value_updated_when_product_added()
        {
            // Arrange
            long siteId = 1;

            var order = OrderFactory.CreateValid(siteId: siteId);

            var product1 = ProductFactory.CreateValid(id: 1, siteId: siteId, price: 10, currency: Currency.RON);
            order.AddProduct(product1, 1, []);

            var product2 = ProductFactory.CreateValid(id: 2, siteId: siteId, price: 15, currency: Currency.RON);
            
            // Act
            order.AddProduct(product2, 2, []);

            // Assert
            Assert.Equal(new Money(40, Currency.RON), order.TotalPrice);
        }
    }
}