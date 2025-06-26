namespace Crozy.DbMigration.App.DatabaseOperations
{
    public interface ISuperUserOnRootDb
    {
        Task CreateDatabaseAsync();

        Task DropDatabaseAsync();
    }
}
