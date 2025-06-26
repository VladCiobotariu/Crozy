using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments.Replays
{
    public static class CrcExtensions
    {
        public static string ToXml(this CrcXml crc)
        {
            using Utf8StringWriter streamWriter = new Utf8StringWriter();
            var serializer = new XmlSerializer(typeof(CrcXml));
            serializer.Serialize(streamWriter, crc);
            string? xml = streamWriter.ToString();
            if (xml is null)
            {
                throw new InvalidOperationException("Could not convert Crc to XML");
            }
            return xml;
        }
    }
}
