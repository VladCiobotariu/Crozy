using Crozy.Domain.Moneys;
using Crozy.Domain.Orders;

namespace Crozy.Domain.Tests.Factories
{
    public static class OrderFactory
    {
        public static Order CreateValid(
            string number = "ON-001",
            long siteId = 1,
            long organisationId = 1,
            PaymentType paymentType = PaymentType.Card
            )
        {
            var order = new Order(
                number: number,
                siteId: siteId,
                organisationId: organisationId,
                shippingAddress: new Address(country: "Romania", region: "Timis", "Timisoara", "str. Hotinului 25"),
                customerDetails: new CustomerDetails(firstName: "Ion", lastName: "B", email: new EmailAddress("ion@mycom.com")),
                paymentType: paymentType
                );

            return order;
        }
    }
}
