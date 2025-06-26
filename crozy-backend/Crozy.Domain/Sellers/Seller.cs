using Crozy.Domain.Services;

namespace Crozy.Domain.Sellers
{
    public class Seller : Entity, IOrganisationEntity
    {

        private Seller(long organisationId, Role role, SellerState sellerState, Invitation? invitation, long? userId = default)
        {
            OrganisationId = organisationId;
            Role = role;
            SellerState = sellerState;
            Invitation = invitation;
            UserId = userId;
        }
        
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        private Seller()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
        }

        public static Seller CreateSellerWithInvitation(long organisationId, Role role, EmailAddress email, IInvitationCodeGeneratorService invitationCodeGenerator)
        {
            var invitation = Invitation.GenerateInvitation(role, email, invitationCodeGenerator);
            return new Seller(
                organisationId: organisationId,
                role: role,
                sellerState: SellerState.InvitationPending,
                invitation: invitation
            );
        }
        
        public static Seller CreateSellerOwner(long organisationId, long userId)
        {
            return new Seller(
                organisationId: organisationId,
                role: Role.Owner,
                sellerState: SellerState.Active,
                invitation: null,
                userId: userId
            );
        }
        
        public Invitation? Invitation { get; private set; }
        
        public SellerState SellerState { get; private set; }

        public long OrganisationId { get; }
        
        public long? UserId { get; private set; }

        public Role Role { get; private set; }

        public bool IsSellerInvitationAccepted()
        {
            return Invitation is not null && Invitation.InvitationState == InvitationState.Accepted;
        }

        public void ChangeRole(Role newRole)
        {
            Role = newRole;
        }
        
        public void ActivateSeller()
        {
            if (SellerState == SellerState.Active)
            {
                throw new InvalidOperationException("Seller already ACTIVE");
            }
            SellerState = SellerState.Active;
        }
    
        public void DisableSeller()
        {
            if (SellerState == SellerState.Active)
            {
                SellerState = SellerState.Disabled;
            }
            else
            {
                throw new InvalidOperationException("Only ACTIVE sellers can be Disabled");
            }
        }
        
        public void AcceptInvitation(long userId)
        {
            if (Invitation is null)
            {
                throw new InvalidOperationException("Seller doesn't have any invitation");
            }

            if (Invitation.InvitationState != InvitationState.Pending)
            {
                throw new InvalidOperationException("Only PENDING invitations can be Accepted");
            }

            Invitation = Invitation.AcceptInvitation();
            this.UserId = userId;
            
            ActivateSeller();
        }
    
        public void CancelInvitation()
        {
            if (Invitation is null)
            {
                throw new InvalidOperationException("Seller doesn't have any invitation");
            }

            if (Invitation.InvitationState != InvitationState.Pending)
            {
                throw new InvalidOperationException("Only PENDING invitations can be Canceled");
            }

            Invitation = Invitation.CancelInvitation();
        }
    }
}
