using Crozy.GraphQL.Organisations;
using HotChocolate.AspNetCore;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Crozy.GraphQL.Buyers;
using Flurl.Util;

namespace Crozy.GraphQL.Auth
{
    public class GlobalStateHttpRequestInterceptor : DefaultHttpRequestInterceptor
    {
        public override ValueTask OnCreateAsync(HttpContext context,
            IRequestExecutor requestExecutor, IQueryRequestBuilder requestBuilder,
            CancellationToken cancellationToken)
        {
            ClaimsIdentity? sellerAuthIdentity = context.User.GetSellerAuthIdentity();
            ClaimsIdentity? buyerAuthIdentity = context.User.GetBuyerAuthIdentity();

            if (sellerAuthIdentity != null)
            {
                if (!sellerAuthIdentity.NoSeller())
                {
                    Claim? organisationClaim = sellerAuthIdentity.FindFirst(Claims.Organisation);
                    if (organisationClaim == null)
                    {
                        throw new InvalidOperationException($"{Claims.Organisation} claim must be present in Seller Auth identity");
                    }

                    if (!long.TryParse(organisationClaim.Value, out long organisationId))
                    {
                        throw new InvalidOperationException($"{Claims.Organisation} claim must contain valid organisationId");
                    }
                    requestBuilder.SetGlobalState(OrganisationsConst.OrganisationId, organisationId);
                }
            }
            if (buyerAuthIdentity != null)
            {
                if (!buyerAuthIdentity.NoBuyer())
                {
                    Claim? buyerIdClaim = buyerAuthIdentity.FindFirst(Claims.InternalBuyerId);
                    if (buyerIdClaim == null)
                    {
                        throw new InvalidOperationException($"{Claims.InternalBuyerId} claim must be present in Buyer Auth identity");
                    }

                    if (!long.TryParse(buyerIdClaim.Value, out long buyerId))
                    {
                        throw new InvalidOperationException($"{Claims.InternalBuyerId} claim must contain valid buyerId");
                    }
                    requestBuilder.SetGlobalState(BuyersConst.BuyerId , buyerId);
                }
            }

            return base.OnCreateAsync(context, requestExecutor, requestBuilder,
                cancellationToken);
        }
    }
}
