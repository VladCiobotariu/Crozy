using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments.Replays
{
    [XmlRoot("crc", Namespace = "", IsNullable = false)]
    public class CrcXml
    {
        [XmlAttribute("error_code")]
        public int ErrorCode { get; set; }

        public bool ShouldSerializeErrorCode() => ErrorCode != 0;

        [XmlText]
        public string ErrorMessage { get; set; } = string.Empty;

        [XmlAttribute("error_type")]
        public int ErrorType { get; set; }

        public bool ShouldSerializeErrorType() => ErrorCode != 0; // ErrorType is only added if ErrorCode is not 0

        public static CrcXml FromCrc(Crc crc) => new CrcXml { ErrorCode = crc.ErrorCode, ErrorType = crc.ErrorType, ErrorMessage = crc.Message };
    }
}
