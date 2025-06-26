using Crozy.Domain.Orders;
using Crozy.Domain.Payments;
using Crozy.Payments.Netopia;
using Crozy.Payments.Netopia.Payments;
using Crozy.Payments.Netopia.Payments.Replays;
using Crozy.Payments.Netopia.Requests;
using Microsoft.Extensions.Options;
using System.Security.Cryptography.Xml;

namespace Crozy.GraphQL.Payments
{
    public class PaymentData
    {
        public PaymentData(string data, string key, string iV, string cipher, string paymentUri)
        {
            Data = data;
            Key = key;
            IV = iV;
            Cipher = cipher;
            PaymentUri = paymentUri;
        }

        public string Data { get; private set; }

        public string Key { get; private set; }

        public string IV { get; private set; }

        public string Cipher { get; private set; }

        public string PaymentUri { get; private set; }
    }

    public interface IPaymentService
    {
        Task<PaymentData> GetPaymentData(Domain.Orders.Order order);
    }

    public class PaymentsService : IPaymentsProcessor, IPaymentService
    {
        private readonly IPaymentTransactionRepository paymentMessageRepository;
        private readonly IOrderRepository orderRepository;
        private readonly NetopiaPaymentsOptions netopiaOptions;

        public PaymentsService(
            IPaymentTransactionRepository paymentMessageRepository, 
            IOrderRepository orderRepository, 
            IOptions<NetopiaPaymentsOptions> netopiaOptions)
        {
            this.paymentMessageRepository = paymentMessageRepository;
            this.orderRepository = orderRepository;
            this.netopiaOptions = netopiaOptions.Value;
        }
        public async Task<PaymentData> GetPaymentData(Domain.Orders.Order order)
        {
            if (order is null)
            {
                throw new ArgumentNullException(nameof(order));
            }

            var cardRequestBuilder = new CardRequestBuilder();
            CardRequest cardRequest = cardRequestBuilder
                .NewOrder(netopiaOptions.Signature)
                .WithPaymentDetails(order.TotalPrice.Amount, Currency.RON, $"Comanda nr. ${order.Number}") //TODO how to incorporate currency from domain into payments
                .WithBillingAddress(
                    addressLine: order.ShippingAddress.Line1, 
                    email: order.CustomerDetails.Email?.Email, 
                    firstName: order.CustomerDetails.FirstName, 
                    lastName: order.CustomerDetails.LastName, 
                    mobilePhone: order.CustomerDetails.PhoneNumber?.Phone, 
                    addressType: AddressType.Person)
                .WithShippingAddress(addressLine: order.ShippingAddress.Line1,
                    email: order.CustomerDetails.Email?.Email,
                    firstName: order.CustomerDetails.FirstName,
                    lastName: order.CustomerDetails.LastName,
                    mobilePhone: order.CustomerDetails.PhoneNumber?.Phone,
                    addressType: AddressType.Person)
                .WithUrls(
                    confirmUrl: netopiaOptions.ConfirmUri,
                    returnUrl: netopiaOptions.ReturnUri)
                .Result();

            string xmlData = cardRequest.Xml;
            EncryptedPaymentData data = netopiaOptions switch
            {
                { PublicKeyThumbprint: not null and not ""} => CryptoHelper.EncryptWithCertThumbprint(xmlData, netopiaOptions.PublicKeyThumbprint),
                { PublicKey: not null and not "" } => CryptoHelper.EncryptWithPublicKeyString(xmlData, netopiaOptions.PublicKey),
                _ => throw new InvalidOperationException($"Unable to encrypt payment data because netopia public key was not fond. " +
                $"Either {nameof(netopiaOptions.PublicKeyThumbprint)} or {nameof(netopiaOptions.PublicKey)} must be provided"),
            };

            var payment = new PaymentTransaction(
                organisationId: order.OrganisationId, 
                orderId: order.Id, 
                xmlRequestMessage: xmlData, 
                requestId: cardRequest.RequestId);
            paymentMessageRepository.Add(payment);
            await paymentMessageRepository.SaveChangesAsync();

            return new PaymentData(
                data: data.EnvData, 
                key: data.EnvKey,
                cipher: "aes-256-cbc", 
                iV: data.IV,
                paymentUri: netopiaOptions.PaymentUri);
        }

        public async Task<Crc> Canceled(CardResponse response)
        {
            // TODO: implament Cancel payment flow
            throw new NotImplementedException("Netopia Canceled is not implemented yet");
        }

        public async Task<Crc> Confirmed(CardResponse response)
        {
            Guid replayOrderId = response.GetOrderId();
            PaymentTransaction? paymentData = await paymentMessageRepository.GetByRequestIdAsync(replayOrderId);
            if (paymentData is null)
            {
                return Crc.Error(1, "Failed to find order by given order ID", Crc.CONFIRM_ERROR_TYPE_TEMPORARY);
            }

            paymentData.AddResponse(response.Xml, response.GetResponseId());
            await paymentMessageRepository.SaveChangesAsync();

            var order = await orderRepository.GetOrderByIdAsync(paymentData.OrderId);
            if (order is null)
            {
                throw new InvalidOperationException("Failed to find order by given Order ID");
            }

            order.ConfirmPayment(paymentData.Id);
            await orderRepository.SaveChangesAsync();

            return Crc.Success(response.Message);
        }

        public async Task<Crc> ConfirmedPending(CardResponse response)
        {
            // TODO: implament ConfirmedPending payment flow
            throw new NotImplementedException("Netopia ConfirmedPending is not implemented yet");
        }

        public async Task<Crc> Paid(CardResponse response)
        {
            // TODO: implament Paid payment flow
            throw new NotImplementedException("Netopia Paid is not implemented yet");
        }

        public async Task<Crc> PaidPending(CardResponse response)
        {
            // TODO: implament PaidPending payment flow
            throw new NotImplementedException("Netopia PaidPending is not implemented yet");
        }
    }
}
