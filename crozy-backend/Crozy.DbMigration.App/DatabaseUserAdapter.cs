using Crozy.DbMigration.App.DatabaseOperations;
using Crozy.Infrastructure.PostgreSQL;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace Crozy.DbMigration.App
{
    public interface IDatabaseUserAdapter
    {
        Task CreateRoleAsync(string roleName);
        Task CreateRoles(RoleProvider roleProvider);
        Task CreateUserFromAzurePrincipalAsync(string principalName);
        Task CreateUserWithPasswordAsync(string userName, string password);
        Task DropRoleAsync(string roleName);
        Task DropRoles(RoleProvider roleProvider);
        Task GrantRoleToUserAsync(string userName, string roleName);
        Task RevokeRoleFromUserAsync(string userName, string roleName);
    }

    public class DatabaseUserAdapter: IDatabaseUserAdapter
    {
        private readonly NpgsqlDataSource superUserOnRootDataSource;
        private readonly NpgsqlDataSource superUserOnAppDataSource;
        private readonly ILogger<DatabaseUserAdapter> logger;

        public DatabaseUserAdapter(
            [FromKeyedServices(Consts.SuperUserOnAppbDataSourceKey)] NpgsqlDataSource superUserOnAppDataSource, 
            [FromKeyedServices(Consts.SuperUserOnRootDbDataSourceKey)] NpgsqlDataSource superUserOnRootDataSource, 
            ILogger<DatabaseUserAdapter> logger)
        {
            this.superUserOnRootDataSource = superUserOnRootDataSource;
            this.superUserOnAppDataSource = superUserOnAppDataSource;
            this.logger = logger;
        }

        public async Task CreateRoles(RoleProvider roleProvider)
        {
            await CreateRoleAsync(roleProvider.ReadOnlyRole);
            await CreateRoleAsync(roleProvider.ReadWriteRole);
            await CreateRoleAsync(roleProvider.DdlMigrationRole);
        }

        public async Task DropRoles(RoleProvider roleProvider)
        {
            await DropRoleAsync(roleProvider.ReadOnlyRole);
            await DropRoleAsync(roleProvider.ReadWriteRole);
            await DropRoleAsync(roleProvider.DdlMigrationRole);
        }

        public async Task CreateRoleAsync(string roleName)
        {
            logger.LogInformation($"Creating role ${roleName}");
            await using var command = superUserOnAppDataSource.CreateCommand($"create role \"{roleName}\"");
            await command.ExecuteNonQueryAsync();
        }

        public async Task DropRoleAsync(string roleName)
        {
            logger.LogInformation($"Droping role ${roleName}");
            await using var revokeCommand = superUserOnAppDataSource.CreateCommand($"revoke all privileges on schema \"public\" from \"{roleName}\"");
            await revokeCommand.ExecuteNonQueryAsync();

            await using var command = superUserOnAppDataSource.CreateCommand($"drop role if exists \"{roleName}\"");
            await command.ExecuteNonQueryAsync();
        }

        public async Task CreateUserWithPasswordAsync(string userName, string password)
        {
            logger.LogInformation($"Creating user {userName}");

            await using var checkDbRoleExistsCommand = superUserOnAppDataSource.CreateCommand($"SELECT 1 FROM pg_roles WHERE rolname='{userName}'");
            object? result = await checkDbRoleExistsCommand.ExecuteScalarAsync();
            if (result is int count && count == 1)
            {
                logger.LogInformation($"Skiping creation of user {userName} because user already exists");
                return;
            }

            await using var command = superUserOnAppDataSource.CreateCommand($"create role \"{userName}\" with login password '{password}'");
            await command.ExecuteNonQueryAsync();
        }

        public async Task CreateUserFromAzurePrincipalAsync(string principalName)
        {
            logger.LogInformation($"Create User From Azure Principal {principalName}");
            
            await using var checkDbRoleExistsCommand = superUserOnRootDataSource.CreateCommand($"select 1 from pgaadauth_list_principals(false) where rolname='{principalName}'");
            object? result = await checkDbRoleExistsCommand.ExecuteScalarAsync();
            if (result is int count && count == 1)
            {
                logger.LogInformation($"Skiping creation of role {principalName} because role already exists");
                return;
            }

            await using var command = superUserOnRootDataSource.CreateCommand($"select * from  pgaadauth_create_principal('{principalName}', false, false)");
            await command.ExecuteNonQueryAsync();
        }

        public async Task GrantRoleToUserAsync(string userName, string roleName)
        {
            logger.LogInformation($"Granting Role {roleName} To User {userName}");

            await using var command = superUserOnAppDataSource.CreateCommand($"grant \"{roleName}\" to \"{userName}\"");
            await command.ExecuteNonQueryAsync();
        }

        public async Task RevokeRoleFromUserAsync(string userName, string roleName)
        {
            logger.LogInformation($"Revoking Role {roleName} from user {userName}");

            await using var command = superUserOnAppDataSource.CreateCommand($"revoke \"{roleName}\" from \"{userName}\"");
            await command.ExecuteNonQueryAsync();
        }
    }
}
