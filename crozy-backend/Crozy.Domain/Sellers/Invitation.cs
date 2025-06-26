using Crozy.Domain.Services;

namespace Crozy.Domain.Sellers;

public record Invitation
{
    private Invitation(Role role, EmailAddress emailAddress, InvitationState invitationState, string invitationCode)
    {
        Role = role;
        EmailAddress = emailAddress;
        InvitationDate = DateTimeOffset.Now;
        InvitationState = invitationState;
        InvitationCode = invitationCode;
    }
    
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    private Invitation()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    {
    }
    
    public string InvitationCode { get; private set; }
    
    public InvitationState InvitationState { get; private set; }
    
    public Role Role { get; private set; }
    
    public EmailAddress EmailAddress { get; private set; }
    
    public DateTimeOffset InvitationDate { get; private set; }
    
    internal static Invitation GenerateInvitation(Role role, EmailAddress email, IInvitationCodeGeneratorService invitationCodeGenerator)
    {
        return new Invitation(
            role: role,
            emailAddress: email,
            invitationState: InvitationState.Pending,
            invitationCode: invitationCodeGenerator.NewInvitationCode()
        );
    }

    internal Invitation AcceptInvitation()
    {
        return new Invitation(
            role: Role,
            emailAddress: EmailAddress with { },
            invitationState: InvitationState.Accepted,
            invitationCode: InvitationCode
        );
    }
    
    internal Invitation CancelInvitation()
    {
        return new Invitation(
            role: Role,
            emailAddress: EmailAddress,
            invitationState: InvitationState.Canceled,
            invitationCode: InvitationCode
        );
    }
}