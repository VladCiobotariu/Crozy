namespace Crozy.Domain.Payments
{
    public class PaymentTransactionResult :Entity, IOrganisationEntity
    {
        public PaymentTransactionResult(string xmlResponseMessage, long paymentTransactionId, long organisationId, string externalId)
        {
            XmlResponseMessage = xmlResponseMessage;
            PaymentTransactionId = paymentTransactionId;
            OrganisationId = organisationId;
            ExternalId = externalId;
        }

        public long OrganisationId { get; private set; }

        public long PaymentTransactionId { get; private set; }

        public string XmlResponseMessage { get; private set; }

        public string ExternalId { get; private set; }
    }
}
