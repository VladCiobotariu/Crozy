namespace Crozy.Domain.Orders
{
    public interface IOrderRepository
    {
        void Add(Order order);

        Task<Order?> GetOrderByIdAsync(long id, CancellationToken cancellationToken = default);

        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}