using Crozy.Domain.Products;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Products
{
    public class AddProductPayload : ProductPayloadBase
    {
        public AddProductPayload(Product product) : base(product)
        {
        }

        public AddProductPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }
    }
}