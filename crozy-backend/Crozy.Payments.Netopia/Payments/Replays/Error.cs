using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments.Replays
{
    public class Error
    {
        [XmlAttribute("code")]
        public int Code { get; set; }

        [XmlText]
        public string Message { get; set; }
    }
}
