using Crozy.Domain.Sites;
using HotChocolate.Data.Filters;

namespace Crozy.GraphQL.Types.FilterTypes;

public class SiteFilterType : FilterInputType<Site>
{
    protected override void Configure(IFilterInputTypeDescriptor<Site> descriptor)
    {
        descriptor.Field(x => x.OrganisationId).Type<IdOperationFilterInputType>();
    }
}