
namespace Crozy.Domain.Buyers;

public interface IBuyerRepository
{
    Buyer Add(Buyer buyer);
    Task<Buyer?> GetBuyerByExternalIdAsync(string externalUserId, CancellationToken cancellationToken = default);
    Task<Buyer?> GetBuyerByIdAsync(long id, CancellationToken cancellationToken = default);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}

