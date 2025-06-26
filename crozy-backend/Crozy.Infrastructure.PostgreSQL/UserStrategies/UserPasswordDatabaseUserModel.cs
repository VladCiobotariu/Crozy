namespace Crozy.Infrastructure.PostgreSQL.UserStrategies
{
    public record UserPasswordDatabaseUserModel(UserPassword ApplicationUser, UserPassword MigrationUser) : IDatabaseUserModel
    {
        IDatabaseUser IDatabaseUserModel.ApplicationUser => ApplicationUser;

        IDatabaseUser IDatabaseUserModel.MigrationUser => MigrationUser;
    }
}
