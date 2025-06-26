using Crozy.Domain.Services;
using Crozy.Infrastructure.Extensions;

namespace Crozy.Infrastructure.Providers;

public class InvitationCodeGeneratorProvider : IInvitationCodeGeneratorService
{
    public string NewInvitationCode()
    {
        return Guid.NewGuid().Encode();
    }
}