using Crozy.Domain.Organisations;
using Crozy.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Crozy.Infrastructure.Repositories;

public class OrganisationRepository : BaseRepository, IOrganisationRepository
{
    public OrganisationRepository(CrozyDbContext dbContext) : base(dbContext)
    {
    }

    public void Add(Organisation organisation)
    {
        dbContext.Organisations.Add(organisation);
    }

    public async Task<Organisation?> GetByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return await dbContext.Organisations
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public void Remove(Organisation organisation)
    {
        dbContext.Organisations.Remove(organisation);
    }
}