using Crozy.Domain.Users;

namespace Crozy.Domain.Organisations;

public interface IOrganisationRepository
{
    void Add(Organisation organisation);
    Task<Organisation?> GetByIdAsync(long id, CancellationToken cancellationToken = default);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
    void Remove(Organisation organisation);
}

