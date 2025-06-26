namespace Crozy.DbMigration.App.DatabaseOperations
{
    public interface ISuperUserOnAppDb
    {
        Task GrantCreateOnSchemaToRoleAsync();

        Task DropAppRolesAsync();
    }
}
