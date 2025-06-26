using Crozy.Domain.Orders;
using HotChocolate.Data.Filters;

namespace Crozy.GraphQL.Types.FilterTypes;

public class OrderFilterType : FilterInputType<Order>
{
    protected override void Configure(IFilterInputTypeDescriptor<Order> descriptor)
    {
        descriptor.Field(x => x.OrganisationId).Type<IdOperationFilterInputType>();
    }
}