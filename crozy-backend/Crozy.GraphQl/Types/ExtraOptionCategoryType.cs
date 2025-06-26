using Crozy.Domain.ExtraOptionCategories;
using Crozy.Domain.ExtraOptions;
using Crozy.GraphQL.DataLoader;
using Crozy.Infrastructure;
using HotChocolate.Types.Pagination;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Types
{
    public class ExtraOptionCategoryType : ObjectType<ExtraOptionCategory>
    {
        protected override void Configure(IObjectTypeDescriptor<ExtraOptionCategory> descriptor)
        {
            descriptor.Field(x => x.Id).ID();

            descriptor.Ignore(x => x.IsTransient());
            descriptor.Ignore(x => x.OrganisationId);
            
            descriptor
                .Field("ExtraOptions")
                .ResolveWith<ExtraOptionResolver>(x => x.GetExtraOptionsAsync(default!, default!, default!, default!))
                .UsePaging<NonNullType<ExtraOptionType>>(options: new PagingOptions() { IncludeTotalCount = true })
                .UseSorting()
                .Name("extraOptions");
        }
        
        private class ExtraOptionResolver
        {
            public async Task<IEnumerable<ExtraOption>> GetExtraOptionsAsync([Parent] ExtraOptionCategory extraOptionCategory, CrozyDbContext dbContext, ExtraOptionByIdLoader extraOptionById, CancellationToken cancellationToken)
            {
                long[] extraOptionIds = await dbContext.ExtraOptions
                    .Where(x => x.ExtraOptionCategoryId == extraOptionCategory.Id)
                    .Select(x => x.Id)
                    .ToArrayAsync(cancellationToken);

                return await extraOptionById.LoadAsync(extraOptionIds, cancellationToken);
            }
        }
    }
}
