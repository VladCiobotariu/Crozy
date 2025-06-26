using Crozy.Domain.Organisations;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Organisations;

public abstract class OrganisationResultBase : Result
{
    protected OrganisationResultBase(Organisation organisation)
    {
        this.Organisation = organisation;
    }

    protected OrganisationResultBase(IReadOnlyList<UserError> errors)
        : base(errors)
    {
    }
    
    public Organisation? Organisation { get; }
}