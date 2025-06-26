using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.Auth.Orders
{
    public class CanGeneratePaymentForOrderRequirement : IAuthorizationRequirement
    {
    }
}
