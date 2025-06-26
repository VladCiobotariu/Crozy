using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments
{
    public enum OrderType
    {
        [XmlEnum(Name = "card")]
        Card
    }
}
