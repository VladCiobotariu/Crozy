using Crozy.Payments.Netopia.Payments;
using Crozy.Payments.Netopia.Payments.Replays;

namespace Crozy.Payments.Netopia.Requests
{
    public class CardResponse
    {
        private readonly Order order;
        private readonly string xml;

        private CardResponse(Order order, string xml)
        {
            this.order = order;
            this.xml = xml;
        }

        public static CardResponse FromXml(string xml)
        {
            Order order = XmlSerializableExtensions.FromXml<Order>(xml);
            return new CardResponse(order, xml);
        }

        public bool IsSuccess => order.Replay.Error.Code == 0;

        public string Action => order.Replay.Action;

        public int ErrorCode => order.Replay.Error.Code;

        public string Message => order.Replay.Error.Message;

        public string Xml => xml;

        public Order Order => order;

        public Guid GetOrderId()
        {
            if(Guid.TryParse(order.Id, out var id))
            {
                return id;
            }
            throw new NetopiaException("Failed to parse order id", Crc.ERROR_CONFIRM_INVALID_ACTION);
        }

        public string GetResponseId() => Order.Replay?.Crc ?? throw new InvalidOperationException("Replay is missing");
    }
}
