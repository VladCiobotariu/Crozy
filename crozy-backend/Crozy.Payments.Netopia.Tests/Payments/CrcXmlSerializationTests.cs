using Crozy.Payments.Netopia.Payments;
using Crozy.Payments.Netopia.Payments.Replays;
using Microsoft.VisualStudio.TestPlatform.CommunicationUtilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crozy.Payments.Netopia.Tests.Payments
{
    public class CrcXmlSerializationTests
    {
        [Fact]
        public void HasCrcElement()
        {
            Crc crc = Crc.Success("Payment processed");
            string xml = CrcXml.FromCrc(crc).ToXml();
            Assert.Contains("<crc ", xml);
            Assert.Contains("</crc>", xml);
        }

        [Fact]
        public void SuccessHasMessage()
        {
            string message = "Payment processed";
            Crc crc = Crc.Success(message);
            string xml = CrcXml.FromCrc(crc).ToXml();
            Assert.Contains(message, xml);
        }
        
        [Fact]
        public void SuccessDoesNotHasErrorCode()
        {
            Crc crc = Crc.Success("Payment processed");
            string xml = CrcXml.FromCrc(crc).ToXml();
            Assert.DoesNotContain("error_code", xml);
        }

        [Fact]
        public void SuccessDoesNotHasErrorType()
        {
            Crc crc = Crc.Success("Payment processed");
            string xml = CrcXml.FromCrc(crc).ToXml();
            Assert.DoesNotContain("error_type", xml);
        }

        [Fact]
        public void ErrorHasMessage()
        {
            string message = "Payment failed";
            Crc crc = Crc.Error(2, message, 3);
            string xml = CrcXml.FromCrc(crc).ToXml();
            Assert.Contains(message, xml);
        }

        [Fact]
        public void ErrorHasErrorCode()
        {
            Crc crc = Crc.Error(2, "Payment failed", 3);
            string xml = CrcXml.FromCrc(crc).ToXml();
            Assert.Contains("error_code=\"2\"", xml);
        }

        [Fact]
        public void ErrorHasErrorType()
        {
            Crc crc = Crc.Error(2, "Payment failed", 3);
            string xml = CrcXml.FromCrc(crc).ToXml();
            Assert.Contains("error_type=\"3\"", xml);
        }
    }
}
