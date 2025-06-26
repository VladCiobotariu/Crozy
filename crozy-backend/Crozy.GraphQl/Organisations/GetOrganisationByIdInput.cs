using Crozy.Domain.Organisations;

namespace Crozy.GraphQL.Organisations;

public record GetOrganisationByIdInput(
        [property: ID(nameof(Organisation))] long organisationId
    );