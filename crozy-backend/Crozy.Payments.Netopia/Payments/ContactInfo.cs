using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments
{
    public class ContactInfo
    {
        [XmlElement("billing")]
        public Address Billing { get; set; }

        [XmlElement("shipping")]
        public Address Shipping { get; set; }
    }
}
