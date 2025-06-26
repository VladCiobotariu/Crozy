using Crozy.Domain.Orders;
using Microsoft.EntityFrameworkCore;

namespace Crozy.Infrastructure.Repositories
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        public OrderRepository(CrozyDbContext dbContext) : base(dbContext)
        {
        }

        public void Add(Order order)
        {
            dbContext.Add(order);
        }

        public async Task<Order?> GetOrderByIdAsync(long id, CancellationToken cancellationToken = default)
        {
            return await dbContext
               .Orders
               .Where(o => o.Id == id)
               .Include(o => o.Items)
               .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
