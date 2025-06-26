namespace Crozy.Domain.Users;

public interface IUserRepository
{
    User Add(User user);
    Task<User?> GetUserByIdAsync(long id, CancellationToken cancellationToken = default);
    Task<List<User>> GetAllUsersForOrganisationAsync(long organisationId, CancellationToken cancellationToken = default);
    Task<User?> GetUserByEmailAsync(EmailAddress email, CancellationToken cancellationToken = default);
    Task<User?> GetUserByExternalIdAsync(string externalId, CancellationToken cancellationToken = default);
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}