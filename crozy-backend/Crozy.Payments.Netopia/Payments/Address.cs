using System.Web;
using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments
{
    public class Address
    {
        [XmlAttribute("type")]
        public AddressType Type { get; set; }

        [XmlIgnore]
        public string? FirstName { get; set; }

        [XmlIgnore]
        public string? LastName { get; set; }

        [XmlIgnore]
        public string? AddressLine { get; set; }

        [XmlIgnore]
        public string? Email { get; set; }


        [XmlIgnore]
        public string? MobilePhone { get; set; }


        [XmlElement("first_name")]
        public System.Xml.XmlCDataSection? FirstNameCDATA
        {
            get
            {
                if (FirstName == null)
                {
                    return null;
                }
                else
                {
                    return new System.Xml.XmlDocument().CreateCDataSection(Uri.EscapeDataString(FirstName));
                }
            }
            set
            {
                FirstName = value?.Value;
            }
        }

        [XmlElement("last_name")]
        public System.Xml.XmlCDataSection? LastNameCDATA
        {
            get
            {
                if (LastName == null)
                {
                    return null;
                }
                else
                {
                    return new System.Xml.XmlDocument().CreateCDataSection(Uri.EscapeDataString(LastName));
                }
            }
            set
            {
                LastName = value?.Value;
            }
        }

        [XmlElement("address")]
        public System.Xml.XmlCDataSection? AddressLineCDATA
        {
            get
            {
                if (AddressLine == null)
                {
                    return null;
                }
                else
                {
                    return new System.Xml.XmlDocument().CreateCDataSection(Uri.EscapeDataString(AddressLine));
                }
            }
            set
            {
                AddressLine = value?.Value;
            }
        }

        [XmlElement("email")]
        public System.Xml.XmlCDataSection? EmailCDATA
        {
            get
            {
                if (Email == null)
                {
                    return null;
                }
                else
                {
                    return new System.Xml.XmlDocument().CreateCDataSection(Uri.EscapeDataString(Email));
                }
            }
            set
            {
                Email = value?.Value;
            }
        }

        public bool ShouldSerializeEmailCDATA() => Email is not null;

        [XmlElement("mobile_phone")]
        public System.Xml.XmlCDataSection? MobilePhoneCDATA
        {
            get
            {
                if (MobilePhone == null)
                {
                    return null;
                }
                else
                {
                    return new System.Xml.XmlDocument().CreateCDataSection(Uri.EscapeDataString(MobilePhone));
                }
            }
            set
            {
                MobilePhone = value?.Value;
            }
        }

        public bool ShouldSerializeMobilePhoneCDATA() => MobilePhone is not null;
    }
}
