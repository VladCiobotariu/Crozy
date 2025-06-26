using Crozy.Domain.Products;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Products
{
    public abstract class ProductPayloadBase : Payload
    {
        protected ProductPayloadBase(Product product)
        {
            Product = product;
        }

        protected ProductPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public Product? Product { get; }
    }
}