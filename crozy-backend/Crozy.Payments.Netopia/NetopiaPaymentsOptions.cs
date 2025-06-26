namespace Crozy.Payments.Netopia
{
    public class NetopiaPaymentsOptions
    {
        public string PrivateKey { get; set; } = "";

        public string? PublicKeyThumbprint { get; set; } = "";

        public string? PublicKey { get; set; } = "";

        public string PaymentUri { get; set; } = "";

        public string Signature { get; set; } = "";

        public string ConfirmUri { get; set; } = "";

        public string ReturnUri { get; set; } = "";
    }
}
