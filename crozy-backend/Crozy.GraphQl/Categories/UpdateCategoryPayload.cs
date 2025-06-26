using Crozy.Domain.Categories;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Categories
{
    public class UpdateCategoryPayload : CategoryPayloadBase
    {
        public UpdateCategoryPayload(Category category) : base(category)
        {
        }

        public UpdateCategoryPayload(IReadOnlyList<UserError> errors) : base(errors)
        { 
        }
    }
}
