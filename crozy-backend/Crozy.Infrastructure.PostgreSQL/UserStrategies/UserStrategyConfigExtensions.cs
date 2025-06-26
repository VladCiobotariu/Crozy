using Crozy.Infrastructure.PostgreSQL.AppEnvironments;
using Microsoft.Extensions.Configuration;

namespace Crozy.Infrastructure.PostgreSQL.UserStrategies
{
    public static class UserStrategyConfigExtensions
    {
        public static IDatabaseUserModel GetUserModel(
            this IConfiguration configuration,
            AppEnvironment appEnvironment)
        {
            // Get DB User Model from UserPassword sections
            IDatabaseUserModel? model = configuration.GetUserPasswordModel(appEnvironment);

            // If UserPassword sections is null then try to get from AzurePrincipalBased section
            if (model == null)
            {
                model = configuration.GetAzurePrincipalDatabaseUserModel();
            }

            // If both UserPassword sections and AzurePrincipalBased are missing throw exception
            if (model is null)
            {
                throw new InvalidOperationException($"Could not create {nameof(IDatabaseUserModel)}");
            }

            return model;
        }

        public static UserPasswordDatabaseUserModel? GetUserPasswordModel(
            this IConfiguration configuration,
            AppEnvironment env)
        {
            IConfigurationSection? passwordBasedConfig = configuration
                .GetSection("ApplicationUsers")
                ?.GetSection("PasswordBased");

            if(passwordBasedConfig == null)
            {
                return null;
            }

            UserPassword? appUser = passwordBasedConfig
                .GetSection("AppUser")
                .GetUserPassword("crozy_app_{0}_usr", env)
                ;

            UserPassword? migrationUser = passwordBasedConfig
                .GetSection("MigrationUser")
                .GetUserPassword("crozy_migration_{0}_usr", env)
                ;

            if (migrationUser is null || appUser is null)
            {
                return null;
            }

            return new UserPasswordDatabaseUserModel(appUser, migrationUser);
        }

        public static UserPassword? GetUserPassword(
            this IConfiguration? configuration,
            string default_user_template,
            AppEnvironment env)
        {
            if (configuration == null)
            {
                return null;
            }

            string? user = configuration.GetValue<string>("User");
            string? password = configuration.GetValue<string>("Password");
            if (password is null)
            {
                return null;
            }

            if (user is null)
            {
                user = string.Format(default_user_template, env.Name);
            }

            return new UserPassword(user, password);
        }

        public static AzurePrincipalDatabaseUserModel? GetAzurePrincipalDatabaseUserModel(
            this IConfiguration configuration)
        {
            IConfigurationSection? azureConfiguration = configuration
                .GetSection("ApplicationUsers")
                ?.GetSection("AzurePrincipalBased");

            if (azureConfiguration == null)
            {
                return null;
            }


            AzurePrincipalUser? appUser = azureConfiguration
                .GetSection("AppUser")
                .GetAzurePrincipalUser()
                ;

            AzurePrincipalUser? migrationUser = azureConfiguration
                .GetSection("MigrationUser")
                .GetAzurePrincipalUser()
                ;

            if (appUser is null || migrationUser is null)
            {
                return null;
            }

            return new AzurePrincipalDatabaseUserModel(appUser, migrationUser);
        }

        public static AzurePrincipalUser? GetAzurePrincipalUser(this IConfiguration? configuration)
        {
            if (configuration == null)
            {
                return null;
            }

            string? user = configuration.GetValue<string>("Principal");
            if (user is null)
            {
                return null;
            }

            return new AzurePrincipalUser(user);
        }
    }
}
