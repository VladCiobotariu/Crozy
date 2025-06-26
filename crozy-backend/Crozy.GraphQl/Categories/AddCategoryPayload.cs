using Crozy.Domain.Categories;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Categories
{
    public class AddCategoryPayload : CategoryPayloadBase
    {
        public AddCategoryPayload(Category product): base(product)
        {
        }

        public AddCategoryPayload(UserError[] userErrors): base(userErrors)
        {
        }
    }
}