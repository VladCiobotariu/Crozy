using Crozy.Domain.Orders;

namespace Crozy.Domain.Services
{
    public interface INotificationService
    {
        Task SendOrderPlacedNotificationAsync(Order order, CancellationToken cancellationToken = default);
    }
}
