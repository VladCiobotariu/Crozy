using Crozy.Infrastructure.PostgreSQL.UserStrategies;

namespace Crozy.DbMigration.App.UserStrategies
{
    public class PasswordRolesStrategy : IUsersStrategy
    {
        private readonly IDatabaseUserAdapter databaseUserAdapter;
        private readonly UserPasswordDatabaseUserModel userPasswordDatabaseUserModel;

        public PasswordRolesStrategy(
            IDatabaseUserAdapter databaseUserAdapter,
            UserPasswordDatabaseUserModel userPasswordDatabaseUserModel)
        {
            this.databaseUserAdapter = databaseUserAdapter;
            this.userPasswordDatabaseUserModel = userPasswordDatabaseUserModel;
        }

        public async Task CreateUsers()
        {
            var appUser = userPasswordDatabaseUserModel.ApplicationUser;
            var migrationUser = userPasswordDatabaseUserModel.MigrationUser;
            await databaseUserAdapter.CreateUserWithPasswordAsync(
                appUser.User,
                appUser.Password
                );

            await databaseUserAdapter.CreateUserWithPasswordAsync(
                migrationUser.User,
                migrationUser.Password
                );
        }
    }
}
