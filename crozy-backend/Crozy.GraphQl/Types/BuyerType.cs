using Crozy.Domain.Users;
using Crozy.Domain.Buyers;
using Crozy.GraphQL.DataLoader;
using HotChocolate.Resolvers;

namespace Crozy.GraphQL.Types;

public class BuyerType : ObjectType<Buyer>
{
    protected override void Configure(IObjectTypeDescriptor<Buyer> descriptor)
    {
        descriptor
            .ImplementsNode()
            .IdField(x => x.Id)
            .ResolveNode(GetById);
        
        descriptor.Field(x => x.UserId).ID(nameof(User));

        descriptor.Ignore(x => x.IsTransient());
    }
    
    private Task<Buyer?> GetById(IResolverContext ctx, long id)
    {
        if (ctx is null)
        {
            throw new ArgumentNullException(nameof(ctx));
        }

#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
        return ctx.DataLoader<BuyerByIdDataLoader>().LoadAsync(id, ctx.RequestAborted);
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
    }
}