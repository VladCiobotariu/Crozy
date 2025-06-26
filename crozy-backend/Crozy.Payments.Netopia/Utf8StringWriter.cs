using System.Text;

namespace Crozy.Payments.Netopia
{
    public class Utf8StringWriter : StringWriter
    {
        public override Encoding Encoding => Encoding.UTF8;
    }
}
