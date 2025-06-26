using Crozy.Domain.Organisations;
using Crozy.GraphQL.DataLoader;
using Crozy.GraphQL.Types;
using Crozy.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Organisations;

[ExtendObjectType(GraphQLTypes.Query)]
public class OrganisationQueries
{
    [UsePaging(IncludeTotalCount = true)]
    [UseFiltering]
    [UseSorting]
    public async Task<List<Organisation>> GetOrganisations(CrozyDbContext context, CancellationToken cancellationToken)
    {
        return await context.Organisations.ToListAsync(cancellationToken);
    }
    
    public async Task<OrganisationByIdResult> GetOrganisationByIdAsync(
        GetOrganisationByIdInput input,
        OrganisationByIdDataLoader organisationById,
        CancellationToken cancellationToken)
    {
        return new(await organisationById.LoadAsync(input.organisationId, cancellationToken));
    }

}