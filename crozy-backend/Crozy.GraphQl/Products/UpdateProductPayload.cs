using Crozy.Domain.Products;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Products
{
    public class UpdateProductPayload : ProductPayloadBase
    {
        public UpdateProductPayload(Product product) : base(product)
        {
        }

        public UpdateProductPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }
    }
}