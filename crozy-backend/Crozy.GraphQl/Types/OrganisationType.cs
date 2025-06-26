using Crozy.Domain.Organisations;
using Crozy.Domain.Sellers;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.DataLoader;
using Crozy.Infrastructure;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Types;

public class OrganisationType : ObjectType<Organisation>
{
    protected override void Configure(IObjectTypeDescriptor<Organisation> descriptor)
    {
        descriptor
            .ImplementsNode()
            .IdField(x => x.Id)
            .ResolveNode(GetById);

        descriptor
            .Field("Sellers")
            .ResolveWith<SellerResolver>(x =>
                x.GetSellersAsync(default!, default!, default!, default))
            .Name("sellers");

        descriptor.Ignore(x => x.IsTransient());
    }
    
    private Task<Organisation?> GetById(IResolverContext ctx, long id)
    {
        if (ctx is null)
        {
            throw new ArgumentNullException(nameof(ctx));
        }

#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
        return ctx.DataLoader<OrganisationByIdDataLoader>().LoadAsync(id, ctx.RequestAborted);
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
    }
    
    private class SellerResolver
    {
        public async Task<IEnumerable<Seller>> GetSellersAsync([Parent] Organisation organisation, CrozyDbContext dbContext, SellerByIdDataLoader sellerById, CancellationToken cancellationToken)
        {
            long[] sellerIds = await dbContext.Sellers
                .Where(s => s.OrganisationId == organisation.Id)
                .Select(s => s.Id)
                .ToArrayAsync(cancellationToken);
        
            return await sellerById.LoadAsync(sellerIds, cancellationToken);
        }
    }
}