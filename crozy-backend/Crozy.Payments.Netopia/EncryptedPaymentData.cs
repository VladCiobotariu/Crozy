namespace Crozy.Payments.Netopia
{
    public record EncryptedPaymentData(string IV, string EnvKey, string EnvData);
}
