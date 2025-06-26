using Crozy.Infrastructure.PostgreSQL.AppEnvironments;
using Crozy.Infrastructure.PostgreSQL.UserStrategies;
using Microsoft.Extensions.Configuration;

namespace Crozy.DbMigration.App.UserStrategies
{
    public static class IConfigurationExtensions
    {
        public static IUsersStrategy CreateRolesStrategy(
            this IConfiguration configuration,
            IDatabaseUserAdapter databaseUserAdapter,
            AppEnvironment env)
        {
            UserPasswordDatabaseUserModel? userModel = configuration.GetUserPasswordModel(env);
            if (userModel != null)
            {
                return new PasswordRolesStrategy(databaseUserAdapter, userModel);
            }

            AzurePrincipalDatabaseUserModel? azureUserModel = configuration.GetAzurePrincipalDatabaseUserModel();

            if (azureUserModel != null)
            {
                return new AzurePrincipalRolesStrategy(databaseUserAdapter, azureUserModel);
            }

            throw new InvalidOperationException($"Could not create {nameof(IUsersStrategy)}");
        }
    }
}
