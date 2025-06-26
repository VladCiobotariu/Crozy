using Crozy.Domain.ExtraOptionCategories;
using Crozy.Domain.ExtraOptions;
using Crozy.GraphQL.DataLoader;
using Crozy.Infrastructure;

namespace Crozy.GraphQL.Types
{
    public class ExtraOptionType : ObjectType<ExtraOption>
    {
        protected override void Configure(IObjectTypeDescriptor<ExtraOption> descriptor)
        {
            descriptor.Field(x => x.Id).ID();

            descriptor
                .Field(x => x.ExtraOptionCategoryId)
                .ID(nameof(ExtraOptionCategory));

            descriptor
                .Field("category")
                .Type<ExtraOptionCategoryType>()
                .Resolve(ctx =>
                {
                    ExtraOption parent = ctx.Parent<ExtraOption>();
                    return ctx.DataLoader<ExtraOptionCategoryByIdDataLoader>().LoadAsync(parent.ExtraOptionCategoryId, ctx.RequestAborted);
                })
                .Name("category");

            descriptor.Ignore(x => x.IsTransient());
            descriptor.Ignore(x => x.OrganisationId);
        }

        private class ExtraOptionCategoryResolver
        {
            public async Task<ExtraOptionCategory> GetExtraOptionCategoryAsync([Parent] ExtraOption extraOption, CrozyDbContext dbContext, ExtraOptionCategoryByIdDataLoader categoryById, CancellationToken cancellationToken)
            {
                return await categoryById.LoadAsync(extraOption.ExtraOptionCategoryId, cancellationToken);
            }
        }
    }
}
