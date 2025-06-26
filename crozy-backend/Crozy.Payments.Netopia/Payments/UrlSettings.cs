using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments
{
    public class UrlSettings
    {
        [XmlElement("return")]
        public string Return { get; set; }

        [XmlElement("confirm")]
        public string Confirm { get; set; }
    }
}
