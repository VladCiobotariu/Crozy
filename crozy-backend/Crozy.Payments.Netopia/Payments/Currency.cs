using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments
{
    public enum Currency
    {
        [XmlEnum(Name = "RON")]
        RON
    }
}
