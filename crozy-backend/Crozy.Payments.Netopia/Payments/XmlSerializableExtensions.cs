using System.Text;
using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments
{
    public static class XmlSerializableExtensions
    {
        public static string ToXml<T>(this T objet)
        {
            using Utf8StringWriter streamWriter = new Utf8StringWriter();
            var serializer = new XmlSerializer(typeof(T));
            serializer.Serialize(streamWriter, objet);
            string? xml = streamWriter.ToString();
            if (xml is null)
            {
                throw new InvalidOperationException($"Could not convert {typeof(T)} to XML");
            }
            return xml;
        }

        public static T FromXml<T>(string xml) where T : class 
        {
            using Utf8StringWriter streamWriter = new Utf8StringWriter();
            var serializer = new XmlSerializer(typeof(T));
            T? order = serializer.Deserialize(xml.Trim().ToStream()) as T;
            if (order is null)
            {
                throw new InvalidOperationException($"Unable to deserialize {typeof(T)} from XML");
            }
            return order;
        }

        private static Stream ToStream(this string xml)
        {
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream, Encoding.UTF8);
            writer.Write(xml);
            writer.Flush();
            stream.Position = 0;
            return stream;
        }
    }
}
