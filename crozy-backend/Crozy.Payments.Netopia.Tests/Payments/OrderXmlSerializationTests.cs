using Crozy.Payments.Netopia.Payments;

namespace Crozy.Payments.Netopia.Tests.Payments
{
    public class OrderXmlSerializationTests
    {
        private Order CreateValidOrder(
            string? billingEmail = "test.billing@mail.com", 
            string? shippingEmial = "test.shipping@mail.com") => new Order
            {
                Id = "c01868a6bdfd99173b33555aaef4927d",
                Signature = "XXXX-ZZZZ-AAAA-BBBB-EEEE",
                Invoice = new Invoice
                {
                    Amount = 20.32m,
                    ContactInfo = new ContactInfo
                    {
                        Billing = new Address
                        {
                            AddressLine = "Armoniei",
                            Email = billingEmail,
                            FirstName = "John",
                            LastName = "Travi",
                            MobilePhone = "172546488",
                            Type = AddressType.Person,
                        },
                        Shipping = new Address
                        {
                            AddressLine = "Dacia",
                            Email = shippingEmial,
                            FirstName = "Matt",
                            LastName = "Far",
                            MobilePhone = "121213",
                            Type = AddressType.Person,
                        }
                    },
                    Currency = Currency.RON,
                    Details = "Plata online cu cardul",
                },
                Type = OrderType.Card,
                Url = new UrlSettings
                {
                    Confirm = "https://my.comm/confirm",
                    Return = "https://my.comm/return",
                },
                Timestamp = new DateTime(2024, 04, 14, 20, 33, 10).ToString("yyyyMMddHHmmss")
            };

        private static string SampleXML = @"
<?xml version=""1.0"" encoding=""utf-8""?>
<order type=""card"" id=""c01868a6bdfd99173b33555aaef4927d"" timestamp=""20240414203310"">
    <signature>XXXX-ZZZZ-AAAA-BBBB-EEEE</signature>
    <invoice currency=""RON"" amount=""20.32"">
        <details><![CDATA[Plata%20online%20cu%20cardul]]></details>
        <contact_info>
            <billing type=""person"">
                <first_name><![CDATA[John]]></first_name>
                <last_name><![CDATA[Travi]]></last_name>
                <address><![CDATA[Armoniei]]></address>
                <email><![CDATA[test.billing%40mail.com]]></email>
                <mobile_phone><![CDATA[172546488]]></mobile_phone>
            </billing>
            <shipping type=""person"">
                <first_name><![CDATA[Matt]]></first_name>
                <last_name><![CDATA[Far]]></last_name>
                <address><![CDATA[Dacia]]></address>
                <email><![CDATA[test.shipping%40mail.com]]></email>
                <mobile_phone><![CDATA[121213]]></mobile_phone>
            </shipping>
        </contact_info>
    </invoice>
    <url>
        <return>https://my.comm/return</return>
        <confirm>https://my.comm/confirm</confirm>
    </url>
</order>";

        [Fact]
        public void HasXmlTags()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.StartsWith("<?xml", actualXml);
        }

        [Fact]
        public void IsUtf8Xml()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("encoding=\"utf-8\"", actualXml);
        }

        [Fact]
        public void HasOrderElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<order ", actualXml);
            Assert.Contains("</order>", actualXml);
        }

        [Fact]
        public void HasTypeAttributeSetToCard()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("type=\"card\"", actualXml);
        }

        [Fact]
        public void HasIdAttributeSet()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("id=\"c01868a6bdfd99173b33555aaef4927d\"", actualXml);
        }

        [Fact]
        public void HasTimestampAttributeSet()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("timestamp=\"20240414203310\"", actualXml);
        }

        [Fact]
        public void HasSignatureSet()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<signature>XXXX-ZZZZ-AAAA-BBBB-EEEE</signature>", actualXml);
        }

        [Fact]
        public void HasInvoiceElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<invoice ", actualXml);
            Assert.Contains("</invoice>", actualXml);
        }

        [Fact]
        public void HasCurrency()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("currency=\"RON\"", actualXml);
        }

        [Fact]
        public void HasAmmount()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("amount=\"20.32\"", actualXml);
        }

        [Fact]
        public void HasDetails()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<details><![CDATA[Plata%20online%20cu%20cardul]]></details>", actualXml);
        }

        [Fact]
        public void HasContactInfoElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<contact_info>", actualXml);
            Assert.Contains("</contact_info>", actualXml);
        }

        [Fact]
        public void HasBillingElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<billing ", actualXml);
            Assert.Contains("</billing>", actualXml);
        }

        [Fact]
        public void HasShippingElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<shipping ", actualXml);
            Assert.Contains("</shipping>", actualXml);
        }

        [Fact]
        public void HasTypePersonAttribute()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("billing type=\"person\"", actualXml);
            Assert.Contains("shipping type=\"person\"", actualXml);
        }

        [Fact]
        public void HasBillingFirstNameElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<first_name><![CDATA[John]]></first_name>", actualXml);
        }


        [Fact]
        public void HasBillingLastNameElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<last_name><![CDATA[Travi]]></last_name>", actualXml);
        }

        [Fact]
        public void HasBillingAddressElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<address><![CDATA[Armoniei]]></address>", actualXml);
        }

        [Fact]
        public void HasBillingEmailElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<email><![CDATA[test.billing%40mail.com]]></email>", actualXml);
        }

        [Fact]
        public void EmptyBillingEmailIsNotIncludedInXml()
        {
            Order order = CreateValidOrder(billingEmail: null, shippingEmial: null);
            string actualXml = order.ToXml();
            Assert.DoesNotContain("<email>", actualXml);
            Assert.DoesNotContain("</email>", actualXml);
        }

        [Fact]
        public void HasBillingMobilePhoneElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<mobile_phone><![CDATA[172546488]]></mobile_phone>", actualXml);
        }

        [Fact]
        public void HasShippingFirstNameElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<first_name><![CDATA[Matt]]></first_name>", actualXml);
        }


        [Fact]
        public void HasShippingLastNameElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<last_name><![CDATA[Far]]></last_name>", actualXml);
        }

        [Fact]
        public void HasShippingAddressElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<address><![CDATA[Dacia]]></address>", actualXml);
        }

        [Fact]
        public void HasShippingEmailElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<email><![CDATA[test.shipping%40mail.com]]></email>", actualXml);
        }

        [Fact]
        public void HasShippingMobilePhoneElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<mobile_phone><![CDATA[121213]]></mobile_phone>", actualXml);
        }


        [Fact]
        public void HasUrlElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<url>", actualXml);
            Assert.Contains("</url>", actualXml);
        }

        [Fact]
        public void HasReturnElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<return>https://my.comm/return</return>", actualXml);
        }

        [Fact]
        public void HasConfirmElement()
        {
            Order order = CreateValidOrder();
            string actualXml = order.ToXml();
            Assert.Contains("<confirm>https://my.comm/confirm</confirm>", actualXml);
        }



    }
}
