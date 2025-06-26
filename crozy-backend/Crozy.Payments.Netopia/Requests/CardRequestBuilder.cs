using Crozy.Payments.Netopia.Payments;

namespace Crozy.Payments.Netopia.Requests
{
    public class CardRequestBuilder
    {
        private Order order;
        private Guid requestId;

        public CardRequestBuilder NewOrder(string signature)
        {
            if (string.IsNullOrWhiteSpace(signature))
            {
                throw new ArgumentException($"'{nameof(signature)}' cannot be null or whitespace.", nameof(signature));
            }

            requestId = Guid.NewGuid();

            order = new Order();
            order.Id = requestId.ToString();
            order.Signature = signature;
            order.Type = OrderType.Card;
            order.Timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
            order.Invoice = new Invoice
            {
                ContactInfo = new ContactInfo(),
            };
            return this;
        }

        public CardRequestBuilder WithUrls(string confirmUrl, string returnUrl)
        {
            order.Url = new UrlSettings
            {
                Confirm = confirmUrl,
                Return = returnUrl,
            };
            return this;
        }

        public CardRequestBuilder WithPaymentDetails(decimal amount, Currency currency, string details) 
        {
            order.Invoice.Amount = amount;
            order.Invoice.Currency = currency;
            order.Invoice.Details = details;
            return this; 
        }

        public CardRequestBuilder WithBillingAddress(
            string addressLine,
            string? email,
            string firstName,
            string lastName,
            string? mobilePhone,
            AddressType addressType)
        {
            order.Invoice.ContactInfo.Billing = new Address
            {
                AddressLine = addressLine,
                Email = email,  
                FirstName = firstName,
                LastName = lastName,
                MobilePhone = mobilePhone,
                Type = addressType,
            };
            return this;
        }

        public CardRequestBuilder WithShippingAddress(
            string addressLine,
            string? email,
            string firstName,
            string lastName,
            string? mobilePhone,
            AddressType addressType)
        {
            order.Invoice.ContactInfo.Shipping = new Address
            {
                AddressLine = addressLine,
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                MobilePhone = mobilePhone,
                Type = addressType,
            };
            return this;
        }

        public CardRequest Result() {  return new CardRequest(order, requestId); }
    }
}
