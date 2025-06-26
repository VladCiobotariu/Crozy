using Crozy.Domain.Products;
using HotChocolate.Data.Filters;

namespace Crozy.GraphQL.Types.FilterTypes;

public class ProductFilterType : FilterInputType<Product>
{
    protected override void Configure(IFilterInputTypeDescriptor<Product> descriptor)
    {
        descriptor.Field(x => x.OrganisationId).Type<IdOperationFilterInputType>();
    }
}