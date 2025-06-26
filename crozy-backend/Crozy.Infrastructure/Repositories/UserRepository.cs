using Crozy.Domain.Users;
using Crozy.Domain;
using Microsoft.EntityFrameworkCore;

namespace Crozy.Infrastructure.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(CrozyDbContext dbContext) : base(dbContext)
    {
    }

    public User Add(User user)
    {
        var addedUser = dbContext.Add(user);
        return addedUser.Entity;
    }

    public async Task<User?> GetUserByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return await dbContext
            .Users
            .Where(o => o.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<User?> GetUserByEmailAsync(EmailAddress email, CancellationToken cancellationToken = default)
    {
        return await dbContext
            .Users
            .Where(o => o.EmailAddress == email)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<User?> GetUserByExternalIdAsync(string externalId, CancellationToken cancellationToken = default)
    {
        return await dbContext
            .Users
            .Where(o => o.ExternalId == externalId)
            .FirstOrDefaultAsync(cancellationToken);
    }
    
    public async Task<List<User>> GetAllUsersForOrganisationAsync(long organisationId, CancellationToken cancellationToken = default)
    {
        return await (from seller in dbContext.Sellers
            join user in dbContext.Users on seller.UserId equals user.Id
            where seller.OrganisationId == organisationId
            select user).ToListAsync(cancellationToken);
    }
}