using Crozy.Domain.Organisations;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Organisations;

public class OrganisationByIdResult : OrganisationResultBase
{
    public OrganisationByIdResult(Organisation organisation) : base(organisation)
    {
    }

    public OrganisationByIdResult(IReadOnlyList<UserError> errors) : base(errors)
    {
    }
}