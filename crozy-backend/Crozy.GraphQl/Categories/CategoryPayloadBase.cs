using Crozy.Domain.Categories;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Categories
{
    public abstract class CategoryPayloadBase : Payload
    {
        protected CategoryPayloadBase(Category category)
        {
            this.Category = category;
        }

        protected CategoryPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public Category? Category { get; }
    }
}