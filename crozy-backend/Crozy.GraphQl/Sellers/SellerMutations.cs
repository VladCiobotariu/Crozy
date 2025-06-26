using System.Security.Claims;
using Crozy.Domain;
using Crozy.Domain.Organisations;
using Crozy.Domain.Sellers;
using Crozy.Domain.Services;
using Crozy.Domain.Users;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Common;
using Crozy.GraphQL.Organisations;
using Crozy.GraphQL.Types;
using HotChocolate.Authorization;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.Sellers;

[ExtendObjectType(GraphQLTypes.Mutation)]
public class SellerMutations
{
        [HotChocolate.Authorization.Authorize]
        public async Task<InviteUserPayload> InviteSellerAsync(
            InviteSellerInput input,
            [GlobalState(OrganisationsConst.OrganisationId)] long organisationId,
            IAuthorizationService authorizationService,
            ISellerRepository sellerRepository,
            IInvitationCodeGeneratorService invitationCodeGenerator,
            IOrganisationRepository organisationRepository,
            IEmailService emailService,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var emails = await sellerRepository.GetAllEmailsForOrganisationAsync(organisationId, cancellationToken);

            if (emails.Contains(input.Email))
            {
                return new InviteUserPayload(new[]
                    { new UserError("Email already registered in organisation.", "EMAIL_ALREADY_REGISTERED") });
            }

            var sellerToAdd = Seller.CreateSellerWithInvitation(organisationId, input.Role, new EmailAddress(input.Email),
                invitationCodeGenerator);

            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [sellerToAdd], Policies.CanManageUserAccess);
            if (authorizationFailed)
            {
                return new InviteUserPayload(errors);
            }

            var addedSeller = sellerRepository.Add(sellerToAdd);
            await sellerRepository.SaveChangesAsync(cancellationToken);

            var organisation = await organisationRepository.GetByIdAsync(organisationId, cancellationToken);
            if (organisation is null)
            {
                return new InviteUserPayload(new[]
                    { new UserError("Organisation with given id not found", "ORGANISATION_NOT_FOUND") });
            }

            var addedSellerInvitation = addedSeller.Invitation ?? throw new ApplicationException($"{nameof(Seller.Invitation)} is missing");

            var sendersName = $"{user.GetGivenName()} {user.GetSurname()}";
            await emailService.SendInvitationEmailAsync(addedSellerInvitation.InvitationCode, organisation.Name, sendersName,
                addedSellerInvitation.EmailAddress.Email);
            
            return new InviteUserPayload(addedSeller);
        }

        public async Task<AcceptInvitationPayload> AcceptInvitationAsync(
            AcceptInvitationInput input,
            ISellerRepository sellerRepository,
            IUserRepository userRepository,
            ClaimsPrincipal user,
            CancellationToken cancellationToken)
        {
            var sellerToAccept =
                await sellerRepository.GetSellerByInvitationCodeAsync(input.InvitationCode, cancellationToken);
            if (sellerToAccept is null)
            {
                return new AcceptInvitationPayload([
                    new UserError("Seller with given invitation code not found", "SELLER_NOT_FOUND")
                ]);
            }

            if (sellerToAccept.IsSellerInvitationAccepted())
            {
                return new AcceptInvitationPayload(sellerToAccept, InvitationResult.AlreadyAccepted);
            }
            
            var registeredUserId = user.GetUserId();
            if (!registeredUserId.HasValue)
            {
                return new AcceptInvitationPayload([
                    new UserError("User not authenticated", "USER_NOT_AUTHENTICATED")
                ]);
            }
            
            var usersInOrganisation =
                await sellerRepository.GetSellerInOrganisationByUserIdAsync(registeredUserId.Value, sellerToAccept.OrganisationId, cancellationToken);
            if (usersInOrganisation is not null)
            {
                return new AcceptInvitationPayload([
                    new UserError("User already registered in organisation", "USER_ALREADY_REGISTERED")
                ]);
            }
            
            sellerToAccept.AcceptInvitation(registeredUserId.Value);
            await sellerRepository.SaveChangesAsync(cancellationToken);

            return new AcceptInvitationPayload(sellerToAccept, InvitationResult.Joined);

        }

        [HotChocolate.Authorization.Authorize]
        public async Task<RemoveSellerPayload> RemoveSellerAsync(
            RemoveSellerInput input,
            ISellerRepository sellerRepository,
            ClaimsPrincipal user,
            IAuthorizationService authorizationService,
            CancellationToken cancellationToken)
        {
            var sellerToRemove = await sellerRepository.GetSellerByIdAsync(input.SellerId, cancellationToken);

            if (sellerToRemove is null)
            {
                return new RemoveSellerPayload([
                    new UserError("Seller not found", "SELLER_NOT_FOUND")
                ]);
            }

            if (sellerToRemove.Role == Role.Owner)
            {
                return new RemoveSellerPayload([
                    new UserError("Can't remove an OWNER", "SELLER_IS_OWNER")
                ]);
            }

            if (sellerToRemove.UserId == user.GetUserId())
            {
                return new RemoveSellerPayload([
                    new UserError("Can't remove yourself", "CANT_REMOVE_YOURSELF")
                ]);
            }
            
            var (authorizationFailed, errors) =
                await authorizationService.AuthorizeOrgEntityForGraphQlAsync(user, [sellerToRemove], Policies.CanManageUserAccess);
            if (authorizationFailed)
            {
                return new RemoveSellerPayload(errors);
            }
            
            sellerRepository.Remove(sellerToRemove);
            await sellerRepository.SaveChangesAsync(cancellationToken);
            return new RemoveSellerPayload(true);
        }
        
        public async Task<OnSellerSignInPayload> OnSellerSignIn(
            ClaimsPrincipal claimsPrincipal,
            SellerService sellerService,
            CancellationToken cancellationToken)
        {
            List<UserError> errors = new List<UserError>();
            
            var externalId = claimsPrincipal.GetExternalId();
            var firstName = claimsPrincipal.GetGivenName();
            var lastName = claimsPrincipal.GetSurname();
            var email = claimsPrincipal.GetEmail();

            if (externalId is null)
            {
                errors.Add(new UserError("External id not present in claim", "EXTERNAL_ID_NOT_FOUND"));
            }
            if (firstName is null)
            {
                errors.Add(new UserError("Seller firstName not present in claim", "SELLER_FIRSTNAME_NOT_FOUND"));
            }
            if (lastName is null)
            {
                errors.Add(new UserError("Seller lastName not present in claim", "SELLER_LASTNAME_NOT_FOUND"));
            }
            if (email is null)
            {
                errors.Add(new UserError("Seller email not present in claim", "SELLER_EMAIL_NOT_FOUND"));
            }
            if (errors.Any())
            {
                return new OnSellerSignInPayload(errors.ToArray());
            }
            var addedSeller =
                await sellerService.AddSellerIfNotExistingWithExternalIdAsync(externalId!, email!, firstName!, lastName!, cancellationToken);

            return new OnSellerSignInPayload(addedSeller);
        }


}