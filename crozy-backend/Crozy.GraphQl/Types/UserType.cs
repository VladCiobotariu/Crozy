using Crozy.Domain.Users;
using Crozy.Domain.Buyers;
using Crozy.Domain.Sellers;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.DataLoader;
using Crozy.Infrastructure;
using HotChocolate.Authorization;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Types;

public class UserType : ObjectType<User>
{
    protected override void Configure(IObjectTypeDescriptor<User> descriptor)
    {
        descriptor.Authorize(Policies.CanViewUserResource, ApplyPolicy.AfterResolver);
        
        descriptor
            .ImplementsNode()
            .IdField(x => x.Id)
            .ResolveNode(GetById);
        
        descriptor
            .Field("Sellers")
            .ResolveWith<SellerResolver>(x =>
                x.GetSellersAsync(default!, default!, default!, default))
            .Name("sellers");
        
        descriptor
            .Field("Buyer")
            .ResolveWith<BuyerResolver>(x =>
                x.GetBuyerAsync(default!, default!, default!, default))
            .Name("buyer");
        
        descriptor.Ignore(x => x.EmailAddress);
        descriptor
            .Field("Email")
            .Resolve(x =>
                x.Parent<User>().EmailAddress.Email)
            .Name("email");

        descriptor.Ignore(x => x.IsTransient());
    }
    
    private Task<User?> GetById(IResolverContext ctx, long id)
    {
        if (ctx is null)
        {
            throw new ArgumentNullException(nameof(ctx));
        }

#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
        return ctx.DataLoader<UserByIdDataLoader>().LoadAsync(id, ctx.RequestAborted);
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
    }
        
    private class SellerResolver
    {
        public async Task<IEnumerable<Seller>> GetSellersAsync([Parent] User user, CrozyDbContext dbContext, SellerByIdDataLoader sellerById, CancellationToken cancellationToken)
        {
            long[] sellerIds = await dbContext.Sellers
                .Where(s => s.UserId == user.Id)
                .Select(s => s.Id)
                .ToArrayAsync(cancellationToken);
        
            return await sellerById.LoadAsync(sellerIds, cancellationToken);
        }
    }
    
    private class BuyerResolver
    {
        public async Task<Buyer> GetBuyerAsync([Parent] User user, CrozyDbContext dbContext, BuyerByIdDataLoader buyerById, CancellationToken cancellationToken)
        {
            long buyerId = await dbContext.Buyers
                .Where(s => s.UserId == user.Id)
                .Select(s => s.Id)
                .SingleOrDefaultAsync(cancellationToken);
        
            return await buyerById.LoadAsync(buyerId, cancellationToken);
        }
    }
}