using Crozy.Domain.ExtraOptions;

namespace Crozy.GraphQL.ExtraOptions;

public record DeleteExtraOptionInput([property: ID(nameof(ExtraOption))] long Id);