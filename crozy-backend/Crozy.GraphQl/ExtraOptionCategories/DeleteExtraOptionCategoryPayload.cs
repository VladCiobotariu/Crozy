using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.ExtraOptionCategories;

public class DeleteExtraOptionCategoryPayload : Payload
{
    public DeleteExtraOptionCategoryPayload(bool deleted) 
    {
        Deleted = deleted;
    }

    public DeleteExtraOptionCategoryPayload(IReadOnlyList<UserError> errors) : base(errors) { }

    public bool Deleted { get; }
}