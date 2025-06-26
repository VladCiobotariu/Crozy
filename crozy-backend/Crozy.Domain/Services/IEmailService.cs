namespace Crozy.Domain.Services;

public interface IEmailService
{
    Task SendInvitationEmailAsync(string invitationCode, string organisationName, string sendersName, string recipient);
}