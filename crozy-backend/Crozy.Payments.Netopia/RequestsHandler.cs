using Crozy.Payments.Netopia.Payments.Replays;
using Crozy.Payments.Netopia.Requests;
using Microsoft.Extensions.Options;

namespace Crozy.Payments.Netopia
{
    public class RequestsHandler
    {
        private NetopiaPaymentsOptions config;
        private readonly IPaymentsProcessor paymentsProcessor;

        public RequestsHandler(IOptions<NetopiaPaymentsOptions> options, IPaymentsProcessor paymentsProcessor)
        {
            config = options.Value;
            this.paymentsProcessor = paymentsProcessor;
        }

        public async Task<string> Confirmation(string method, string encData, string encEvKey, string cipher, string iv)
        {
            if (method != "POST")
            {
                return ToXml(Crc.InvalidPostMethodError());
            }
            if (string.IsNullOrWhiteSpace(encEvKey) ||
                string.IsNullOrWhiteSpace(cipher) ||
                string.IsNullOrWhiteSpace(encData) ||
                string.IsNullOrWhiteSpace(iv))
            {
                return ToXml(Crc.InvalidPostMethodError());
            }
            try
            {
                var plainXml = CryptoHelper.Decrypt(config.PrivateKey, iv, encEvKey, encData);
                CardResponse response = CardResponse.FromXml(plainXml);
                var processor = GetResponseProcessor(response);
                Crc crc = await processor(response);
                return ToXml(crc);
            }
            catch (NetopiaException exception)
            {
                Crc crc = Crc.Error(exception.ErrorCode, exception.Message, Crc.CONFIRM_ERROR_TYPE_TEMPORARY);
                return ToXml(crc);
            }

        }

        private string ToXml(Crc crc) => CrcXml.FromCrc(crc).ToXml();

        public Func<CardResponse, Task<Crc>> GetResponseProcessor(CardResponse response) =>
            response switch
            {
                { IsSuccess: false } => (_) => Task.FromResult(Crc.Error(response.ErrorCode, response.Message, Crc.CONFIRM_ERROR_TYPE_TEMPORARY)),
                { IsSuccess: true, Action: Replay.Actions.Confirmed } => paymentsProcessor.Confirmed,
                { IsSuccess: true, Action: Replay.Actions.Paid } => paymentsProcessor.Paid,
                { IsSuccess: true, Action: Replay.Actions.Canceled } => paymentsProcessor.Canceled,
                { IsSuccess: true, Action: Replay.Actions.ConfirmedPending } => paymentsProcessor.ConfirmedPending,
                { IsSuccess: true, Action: Replay.Actions.PaidPending } => paymentsProcessor.PaidPending,
                _ => throw new InvalidOperationException($"'{response.Action}' is not known action"),
            };
    }
}
