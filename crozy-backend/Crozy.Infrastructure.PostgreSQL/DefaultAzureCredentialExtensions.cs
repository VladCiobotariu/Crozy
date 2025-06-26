using Azure.Identity;

namespace Crozy.Infrastructure.PostgreSQL
{
    public static class DefaultAzureCredentialExtensions
    {
        private static readonly string[] Scopes = ["https://ossrdbms-aad.database.windows.net/.default"];

        public static async Task<string> GetAccessToken(
            this DefaultAzureCredential azureCredential, 
            CancellationToken cancellationToken = default)
        {
            var tokenContext = new Azure.Core.TokenRequestContext(scopes: Scopes);
            var tokenResult = await azureCredential.GetTokenAsync(tokenContext, cancellationToken);
            var accessToken = tokenResult.Token;
            return accessToken;
        }
    }
}
