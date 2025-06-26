using Crozy.Payments.Netopia.Payments;

namespace Crozy.Payments.Netopia.Requests
{
    public class CardRequest
    {

        public Order Order { get; private set; }

        public Guid RequestId { get; }

        public CardRequest(Order order, Guid requestId)
        {
            Order = order;
            RequestId = requestId;
        }

        public string Xml => Order.ToXml();
    }
}
