using Crozy.Payments.Netopia.Payments.Replays;
using Crozy.Payments.Netopia.Requests;

namespace Crozy.Payments.Netopia
{
    public interface IPaymentsProcessor
    {
        Task<Crc> Confirmed(CardResponse response);

        Task<Crc> Paid(CardResponse response);

        Task<Crc> Canceled(CardResponse response);

        Task<Crc> ConfirmedPending(CardResponse response);

        Task<Crc> PaidPending(CardResponse response);
    }
}
