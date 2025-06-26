using Crozy.Domain.Users;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Users;

public abstract class UserPayloadBase : Payload
{
    protected UserPayloadBase(User user)
    {
        User = user;
    }

    protected UserPayloadBase(IReadOnlyList<UserError> errors)
        : base(errors)
    {
    }

    public User? User { get; }
}