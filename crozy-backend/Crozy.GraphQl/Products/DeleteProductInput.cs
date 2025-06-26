using Crozy.Domain.Products;
using HotChocolate.Types.Relay;

namespace Crozy.GraphQL.Products
{
    public record DeleteProductInput([property: ID(nameof(Product))] long Id);
}
