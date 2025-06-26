using Crozy.DbMigration.App.DatabaseOperations;

namespace Crozy.DbMigration.App
{
    public class ApplicationRunner
    {
        private readonly ApplicationAction action;
        private readonly ISuperUserOnRootDb superUserOnRootDb;
        private readonly ISuperUserOnAppDb superUserOnAppDb;
        private readonly IMigrationUserOnAppDb migrationUserOnAppDb;

        public ApplicationRunner(
            ApplicationAction action, 
            ISuperUserOnRootDb superUserOnRootDb,
            ISuperUserOnAppDb superUserOnAppDb,
            IMigrationUserOnAppDb migrationUserOnAppDb)
        {
            this.action = action;
            this.superUserOnRootDb = superUserOnRootDb;
            this.superUserOnAppDb = superUserOnAppDb;
            this.migrationUserOnAppDb = migrationUserOnAppDb;
        }

        public Task Run() =>
            action.Name switch
            {
                "migrate" => Migrate(),
                "create-database" => CreateDatabase(),
                "drop-database" => DropDatabase(),
                _ => throw new InvalidOperationException("Unknown action")
            };

        public async Task Migrate()
        {
            await migrationUserOnAppDb.MigrateAsync();
        }

        public async Task CreateDatabase()
        {
            await superUserOnRootDb.CreateDatabaseAsync();
            await superUserOnAppDb.GrantCreateOnSchemaToRoleAsync();
            await Migrate();
        }

        private async Task DropDatabase()
        {
            await superUserOnAppDb.DropAppRolesAsync();
            await superUserOnRootDb.DropDatabaseAsync();
        }
    }
}
