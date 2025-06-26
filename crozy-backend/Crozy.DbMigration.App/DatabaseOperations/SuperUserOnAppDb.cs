using Crozy.Infrastructure.PostgreSQL;
using Crozy.Infrastructure.PostgreSQL.UserStrategies;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace Crozy.DbMigration.App.DatabaseOperations
{
    public class SuperUserOnAppDb : ISuperUserOnAppDb
    {
        private readonly NpgsqlDataSource npgsqlDataSource;
        private readonly IDatabaseUserModel databaseUserModel;
        private readonly ILogger<SuperUserOnAppDb> logger;
        private readonly RoleProvider roleProvider;

        public SuperUserOnAppDb(
            [FromKeyedServices(Consts.SuperUserOnAppbDataSourceKey)] NpgsqlDataSource npgsqlDataSource,
            RoleProvider roleProvider,            
            IDatabaseUserModel databaseUserModel,
            ILogger<SuperUserOnAppDb> logger
            )
        {
            this.npgsqlDataSource = npgsqlDataSource;
            this.databaseUserModel = databaseUserModel;
            this.logger = logger;
            this.roleProvider = roleProvider;
        }


        public async Task GrantCreateOnSchemaToRoleAsync()
        {
            await GrantCreateOnSchemaToRoleAsync(roleProvider.DdlMigrationRole);
        }

        public async Task DropAppRolesAsync()
        {
            await DropRoleAsync(databaseUserModel.ApplicationUser.UserName);
            await DropRoleAsync(databaseUserModel.MigrationUser.UserName);

            await DropRoleAsync(roleProvider.ReadOnlyRole);
            await DropRoleAsync(roleProvider.ReadWriteRole);
            await DropRoleAsync(roleProvider.DdlMigrationRole);
        }

        private async Task GrantCreateOnSchemaToRoleAsync(string roleName)
        {
            await using var command = npgsqlDataSource.CreateCommand($"grant create on schema \"public\" to \"{roleName}\"");
            await command.ExecuteNonQueryAsync();
        }

        private async Task DropRoleAsync(string roleName)
        {
            await using var revokePrivilegesOnSchemaCommand = npgsqlDataSource.CreateCommand($"REASSIGN OWNED BY \"{roleName}\" TO postgres");
            await revokePrivilegesOnSchemaCommand.ExecuteNonQueryAsync();

            await using var revokePrivilegesOnAllTablesCommand = npgsqlDataSource.CreateCommand($"DROP OWNED BY \"{roleName}\"");
            await revokePrivilegesOnAllTablesCommand.ExecuteNonQueryAsync();

            await using var command = npgsqlDataSource.CreateCommand($"drop role \"{roleName}\"");
            await command.ExecuteNonQueryAsync();
        }
    }



}
