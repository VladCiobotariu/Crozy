using Crozy.Domain;
using Crozy.GraphQL.Common;
using Crozy.Domain.Users;

namespace Crozy.GraphQL.Users;

public class QueryUserPayload : UserPayloadBase
{
    public QueryUserPayload(User user) : base(user)
    {
    }

    public QueryUserPayload(IReadOnlyList<UserError> errors) : base(errors)
    {
    }
}