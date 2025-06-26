namespace Crozy.Infrastructure.PostgreSQL.UserStrategies
{
    public record AzurePrincipalDatabaseUserModel(AzurePrincipalUser ApplicationUser, AzurePrincipalUser MigrationUser) : IDatabaseUserModel
    {
        IDatabaseUser IDatabaseUserModel.ApplicationUser => ApplicationUser;

        IDatabaseUser IDatabaseUserModel.MigrationUser => MigrationUser;
    }
}
