using Crozy.Infrastructure.PostgreSQL.UserStrategies;

namespace Crozy.DbMigration.App.UserStrategies
{
    public class AzurePrincipalRolesStrategy : IUsersStrategy
    {
        private readonly IDatabaseUserAdapter databaseUserAdapter;
        private readonly AzurePrincipalDatabaseUserModel databaseUserModel;

        public AzurePrincipalRolesStrategy(
            IDatabaseUserAdapter databaseUserAdapter,
            AzurePrincipalDatabaseUserModel databaseUserModel)
        {
            this.databaseUserAdapter = databaseUserAdapter;
            this.databaseUserModel = databaseUserModel;
        }

        public async Task CreateUsers()
        {
            var appUser = databaseUserModel.ApplicationUser;
            var migrationUser = databaseUserModel.MigrationUser;

            await databaseUserAdapter.CreateUserFromAzurePrincipalAsync(appUser.UserName);

            await databaseUserAdapter.CreateUserFromAzurePrincipalAsync(migrationUser.UserName);
        }
    }
}
