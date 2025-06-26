using Crozy.Domain;
using Crozy.Domain.Organisations;
using Crozy.Domain.Sellers;

namespace Crozy.GraphQL.Sellers;

public record InviteSellerInput(
    string Email,
    Role Role
);