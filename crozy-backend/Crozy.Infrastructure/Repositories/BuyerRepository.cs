using Crozy.Domain;
using Crozy.Domain.Buyers;
using Microsoft.EntityFrameworkCore;

namespace Crozy.Infrastructure.Repositories;

public class BuyerRepository : BaseRepository, IBuyerRepository
{
    public BuyerRepository(CrozyDbContext dbContext) : base(dbContext)
    {
    }

    public Buyer Add(Buyer buyer)
    {
        var addedBuyer = dbContext.Add(buyer);
        return addedBuyer.Entity;
    }

    public async Task<Buyer?> GetBuyerByExternalIdAsync(string externalUserId, CancellationToken cancellationToken = default)
    {
        return await (from buyer in dbContext.Buyers 
                        join user in dbContext.Users on buyer.UserId equals user.Id
                        where user.ExternalId == externalUserId
                        select buyer).SingleOrDefaultAsync(cancellationToken);
    }

    public Task<Buyer?> GetBuyerByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}