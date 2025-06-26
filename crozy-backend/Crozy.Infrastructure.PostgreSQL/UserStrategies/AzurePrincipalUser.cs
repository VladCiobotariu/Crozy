namespace Crozy.Infrastructure.PostgreSQL.UserStrategies
{
    public class AzurePrincipalUser(string PrincipalName) : IDatabaseUser
    {
        public string UserName => PrincipalName;
    }
}
