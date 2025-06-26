using System.Xml.Serialization;

namespace Crozy.Payments.Netopia.Payments.Replays
{
    public class Replay
    {
        public static class Actions
        {
            public const string Confirmed = "confirmed";
            public const string ConfirmedPending = "confirmed_pending";
            public const string PaidPending = "paid_pending";
            public const string Paid = "paid";
            public const string Canceled = "canceled";
            public const string Credit = "credit";
        }

        [XmlAttribute("timestamp")]
        public string Timestamp { get; set; }

        [XmlAttribute("crc")]
        public string Crc { get; set; }

        [XmlElement("action")]
        public string Action { get; set; }

        [XmlElement("purchase")]
        public string Purchase { get; set; }

        [XmlElement("original_amount")]
        public decimal OriginalAmount { get; set; }

        [XmlElement("processed_amount")]
        public decimal ProcessedAmount { get; set; }

        [XmlElement("current_payment_count")]
        public int CurrentPaymentCount { get; set; }

        [XmlElement("pan_masked")]
        public string PanMasked { get; set; }

        [XmlElement("rrn")]
        public string Rrn { get; set; }

        [XmlElement("payment_instrument_id")]
        public string PaymentInstrumentId { get; set; }

        [XmlElement("customer")]
        public Address Customer { get; set; }

        [XmlElement("error")]
        public Error Error { get; set; }
    }
}
