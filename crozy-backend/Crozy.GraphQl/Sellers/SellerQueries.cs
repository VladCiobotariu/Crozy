using System.Security.Claims;
using Crozy.Domain.Sellers;
using Crozy.Domain.Users;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Types;
using Crozy.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Sellers;

[ExtendObjectType(GraphQLTypes.Query)]
public class SellerQueries
{
    [HotChocolate.Authorization.Authorize]
    public async Task<SellerByIdResult> GetMySellerAsync(
        CrozyDbContext crozyDbContext,
        ClaimsPrincipal user,
        CancellationToken cancellationToken)
    {
        var sellerId = user.GetSellerId();

        var mySeller = await (from seller in crozyDbContext.Sellers
            where seller.Id == sellerId
            select seller).FirstOrDefaultAsync(cancellationToken);

        if (mySeller is null)
        {
            return new SellerByIdResult(new[] { new UserError("Seller not found", "SELLER_NOT_FOUND") });
        }

        return new SellerByIdResult(mySeller);
    }
}