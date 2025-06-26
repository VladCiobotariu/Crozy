using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments
{
    public class Invoice
    {
        [XmlAttribute("currency")]
        public Currency Currency { get; set; }

        [XmlAttribute("amount")]
        public decimal Amount { get; set; }

        [XmlIgnore]
        public string? Details { get; set; }

        [XmlElement("contact_info")]
        public ContactInfo ContactInfo { get; set; }

        [XmlElement("details")]
        public System.Xml.XmlCDataSection? DetailsCDATA
        {
            get
            {
                if (Details == null)
                {
                    return null;
                }
                else
                {
                    return new System.Xml.XmlDocument().CreateCDataSection(Uri.EscapeDataString(Details));
                }
            }
            set
            {
                Details = value.Value;
            }
        }
    }
}
