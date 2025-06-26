using Crozy.Domain.Users;
using Crozy.Domain.Organisations;
using Crozy.Domain.Sellers;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.DataLoader;
using Crozy.Infrastructure;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Types;

public class SellerType : ObjectType<Seller>
{
    protected override void Configure(IObjectTypeDescriptor<Seller> descriptor)
    {
        descriptor.Authorize(Policies.CanViewSellerFields, ApplyPolicy.AfterResolver);
        
        descriptor
            .ImplementsNode()
            .IdField(x => x.Id)
            .ResolveNode(GetById);
        
        descriptor
            .Field("Organisation")
            .ResolveWith<OrganisationResolver>(x =>
                x.GetOrganisationAsync(default!, default!, default!, default))
            .Name("organisation");
        
        descriptor
            .Field("User")
            .ResolveWith<UserResolver>(x =>
                x.GetUserAsync(default!, default!, default!, default))
            .Name("user");
        
        descriptor.Field(x => x.OrganisationId).ID(nameof(Organisation));
        descriptor.Field(x => x.UserId).ID(nameof(User));

        descriptor.Ignore(x => x.IsTransient());
    }
    
    private Task<Seller?> GetById(IResolverContext ctx, long id)
    {
        if (ctx is null)
        {
            throw new ArgumentNullException(nameof(ctx));
        }

#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
        return ctx.DataLoader<SellerByIdDataLoader>().LoadAsync(id, ctx.RequestAborted);
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
    }
    
    private class OrganisationResolver
    {
        public async Task<Organisation> GetOrganisationAsync([Parent] Seller seller, CrozyDbContext dbContext, OrganisationByIdDataLoader organisationById, CancellationToken cancellationToken)
        {
            long organisationId = await dbContext.Organisations
                .Where(s => s.Id == seller.OrganisationId)
                .Select(s => s.Id)
                .SingleOrDefaultAsync(cancellationToken);
        
            return await organisationById.LoadAsync(organisationId, cancellationToken);
        }
    }
    
    private class UserResolver
    {
        public async Task<User?> GetUserAsync([Parent] Seller seller, CrozyDbContext dbContext, UserByIdDataLoader userById, CancellationToken cancellationToken)
        {
            long organisationId = await dbContext.Users
                .Where(u => u.Id == seller.UserId)
                .Select(s => s.Id)
                .SingleOrDefaultAsync(cancellationToken);
        
            return await userById.LoadAsync(organisationId, cancellationToken);
        }
    }
}