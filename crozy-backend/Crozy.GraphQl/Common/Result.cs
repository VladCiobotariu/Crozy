namespace Crozy.GraphQL.Common;

public abstract class Result
{
    protected Result(IReadOnlyList<UserError>? errors = null)
    {
        Errors = errors;
    }

    public IReadOnlyList<UserError>? Errors { get; }
}