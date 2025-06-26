using Crozy.Domain.Moneys;
using Crozy.Domain.Products;

namespace Crozy.Domain.Tests.Factories
{
    public static class ProductFactory
    {
        public static Product CreateValid(
            long id,
            string name = "Coffe",
            long siteId = 1,
            decimal price = 20,
            Currency currency = Currency.RON,
            string slug = "coffe",
            long organisationId = 1
            )
        {
            var product = new Product(name: "Coffe", siteId: siteId, price: new Money(price, currency), slug: slug, organisationId: organisationId, extraOptions: []);

            product.WithPeristed(id);
            return product;
        }
    }
}
