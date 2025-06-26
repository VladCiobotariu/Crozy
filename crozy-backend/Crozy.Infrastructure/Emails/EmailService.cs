using Azure;
using Azure.Communication.Email;
using Crozy.Domain.Services;
using Crozy.Infrastructure.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Crozy.Infrastructure.Emails;

public class EmailService : IEmailService
{
    private readonly IOptions<EmailServiceOptions> options;
    private readonly EmailClient emailClient;

    private readonly string senderEmail;
    
    public EmailService(IOptions<EmailServiceOptions> options, EmailClient emailClient)
    {
        this.options = options;
        this.emailClient = emailClient;
        this.senderEmail = this.options.Value.SendersEmail ?? throw new ArgumentException($"{nameof(EmailServiceOptions.SendersEmail)} is missing", nameof(options));
    }

    public async Task SendInvitationEmailAsync(string invitationCode, string organisationName, string sendersName, string recipient)
    {
        var adminHostUrl = options.Value.AdminHostUrl;
        var invitationLink = $"{adminHostUrl}/seller/invitations?code={invitationCode}";
        var emailSubject = $"{sendersName} te-a invitat în {organisationName}";
        var emailContent = $"<html><body><h3>Salut,</h3><br/><h4>Ai fost invitat să te alături echipei din {organisationName} de pe platforma Crozy.</h4><p>Pentru a acepta invitația apasă pe link-ul de mai jos: {invitationLink}.</p></body></html>";
        
        await emailClient.SendAsync(
            WaitUntil.Completed,
            senderEmail,
            recipient,
            emailSubject,
            emailContent);
    }
}