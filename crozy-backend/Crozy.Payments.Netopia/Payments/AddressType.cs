using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments
{
    public enum AddressType
    {
        [XmlEnum(Name = "person")]
        Person,

        [XmlEnum(Name = "company")]
        Company,
    }
}
