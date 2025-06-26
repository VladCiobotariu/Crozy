using System.Security.Claims;
using Crozy.Domain;
using Crozy.Domain.Buyers;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Types;
using Microsoft.Extensions.Logging;

namespace Crozy.GraphQL.Buyers
{
    [ExtendObjectType(GraphQLTypes.Mutation)]
    public class BuyerMutations
    {
        private readonly ILogger<BuyerMutations> _logger;
        public BuyerMutations(ILogger<BuyerMutations> logger)
        {
            _logger = logger;
        }
        
        [HotChocolate.Authorization.Authorize]
        public async Task<OnBuyerSignInPayload> OnBuyerSignInAsync(
            ClaimsPrincipal claimsPrincipal,
            BuyerService buyerService,
            CancellationToken cancellationToken)
        {
            List<UserError> errors = new List<UserError>();
            
            var externalId = claimsPrincipal.GetExternalId();
            var firstName = claimsPrincipal.GetGivenName();
            var lastName = claimsPrincipal.GetSurname();
            var email = claimsPrincipal.GetEmail();
            
            if (externalId is null)
            {
                _logger.LogWarning("External id not present in claim");
                errors.Add(new UserError("External id not present in claim", "EXTERNAL_ID_NOT_FOUND"));
            }

            if (firstName is null)
            {
                _logger.LogWarning("Buyer firstName not present in claim");
                errors.Add(new UserError("Buyer firstName not present in claim", "BUYER_FIRSTNAME_NOT_FOUND"));
            }

            if (lastName is null)
            {
                _logger.LogWarning("Buyer lastName not present in claim");
                errors.Add(new UserError("Buyer lastName not present in claim", "BUYER_LASTNAME_NOT_FOUND"));
            }
            
            if (email is null)
            {
                _logger.LogWarning("Buyer email not present in claim");
                errors.Add(new UserError("Buyer email not present in claim", "BUYER_EMAIL_NOT_FOUND"));
            }
            
            if (errors.Any())
            {
                return new OnBuyerSignInPayload(errors.ToArray());
            }
            
            var addedBuyer =
                await buyerService.AddBuyerIfNotExistingWithExternalId(externalId!, new EmailAddress(email!), firstName!, lastName!);

            return new OnBuyerSignInPayload(addedBuyer);
        }
    }
}
