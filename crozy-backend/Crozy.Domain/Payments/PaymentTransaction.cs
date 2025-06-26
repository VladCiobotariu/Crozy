namespace Crozy.Domain.Payments
{
    public class PaymentTransaction : Entity, IOrganisationEntity
    {
        private List<PaymentTransactionResult> results = new List<PaymentTransactionResult>();

        // Parameterless constructor for EF
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        private PaymentTransaction()
        {
        }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public PaymentTransaction(
            long organisationId, 
            long orderId, 
            string xmlRequestMessage, 
            Guid requestId)
        {
            OrganisationId = organisationId;
            OrderId = orderId;
            XmlRequestMessage = xmlRequestMessage;
            RequestId = requestId;
        }

        public string XmlRequestMessage { get; private set; }

        public Guid RequestId { get; private set; }

        public IReadOnlyCollection<PaymentTransactionResult> Results => results.AsReadOnly();

        public long OrganisationId { get; private set; }
        public long OrderId { get; private set; }

        public void SetRequestMessage(string xmlRequestMessage)
        {
            XmlRequestMessage = xmlRequestMessage ?? throw new ArgumentNullException(nameof(xmlRequestMessage));
        }

        public void AddResponse(string xml, string externalId)
        {
            var result = new PaymentTransactionResult(xml, this.Id, this.OrganisationId, externalId);
            results.Add(result);
        }
    }
}
