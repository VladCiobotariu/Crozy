using Crozy.Domain.Categories;
using HotChocolate.Data.Filters;

namespace Crozy.GraphQL.Types.FilterTypes;

public class CategoryFilterType : FilterInputType<Category>
{
    protected override void Configure(IFilterInputTypeDescriptor<Category> descriptor)
    {
        descriptor.Field(x => x.OrganisationId).Type<IdOperationFilterInputType>();
    }
}