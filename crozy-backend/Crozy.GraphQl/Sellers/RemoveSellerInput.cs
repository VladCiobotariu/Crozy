using Crozy.Domain.Sellers;

namespace Crozy.GraphQL.Sellers;

public record RemoveSellerInput(
    [property: ID(nameof(Seller))] long SellerId
);