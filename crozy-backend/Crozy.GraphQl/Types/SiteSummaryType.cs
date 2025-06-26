using Crozy.Domain.Sites;
using Crozy.GraphQL.DataLoader;
using HotChocolate.Resolvers;
using HotChocolate.Types;

namespace Crozy.GraphQL.Types
{
    public class SiteSummaryType : ObjectType<Site>
    {
        protected override void Configure(IObjectTypeDescriptor<Site> descriptor)
        {
            descriptor.Name("SiteSummary");

            descriptor.Field(x => x.Id).ID(nameof(Site));

            descriptor
               .ImplementsNode()
               .IdField(t => t.Id)
               .ResolveNode(GetById);

            descriptor.Ignore(x => x.IsTransient());
        }

        private Task<Site?> GetById(IResolverContext ctx, long id)
        {
            if (ctx is null)
            {
                throw new ArgumentNullException(nameof(ctx));
            }

#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
            return ctx.DataLoader<SiteByIdDataLoader>().LoadAsync(id, ctx.RequestAborted);
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
        }

    }
}
