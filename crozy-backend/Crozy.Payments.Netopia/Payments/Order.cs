using Crozy.Payments.Netopia.Payments.Replays;
using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments
{
    [Serializable]
    [XmlRoot("order", Namespace = "", IsNullable = false)]
    public class Order
    {
        [XmlAttribute("id")]
        public string Id { get; set; }

        [XmlAttribute("timestamp")]
        public string Timestamp { get; set; }

        [XmlAttribute("type")]
        public OrderType Type { get; set; }

        [XmlElement("signature")]
        public string Signature { get; set; }

        [XmlElement("invoice")]
        public Invoice Invoice { get; set; }

        [XmlElement("url")]
        public UrlSettings Url { get; set; }

        [XmlElement("ipn_cipher")]
        public string IpnCipher { get; set; } = "aes-256-cbc";

        [XmlElement("mobilpay")]
        public Replay? Replay { get; set; }
    }
}
