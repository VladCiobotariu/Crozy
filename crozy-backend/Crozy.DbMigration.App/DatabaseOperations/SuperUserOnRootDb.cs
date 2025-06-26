using Crozy.DbMigration.App.UserStrategies;
using Crozy.Infrastructure.PostgreSQL;
using Crozy.Infrastructure.PostgreSQL.ConnectionStrings;
using Crozy.Infrastructure.PostgreSQL.UserStrategies;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace Crozy.DbMigration.App.DatabaseOperations
{
    public class SuperUserOnRootDb : ISuperUserOnRootDb
    {
        private readonly DatabaseNameProvider databaseNameProvider;
        private readonly RoleProvider roleProvider;
        private readonly IUsersStrategy createUsersStrategy;
        private readonly IDatabaseUserModel databaseUserModel;
        private readonly ILogger<SuperUserOnRootDb> logger;
        private readonly NpgsqlDataSource npgsqlDataSource;

        public SuperUserOnRootDb(
            [FromKeyedServices(Consts.SuperUserOnRootDbDataSourceKey)] NpgsqlDataSource npgsqlDataSource,
            DatabaseNameProvider databaseNameProvider,
            RoleProvider roleProvider,
            IUsersStrategy createUsersStrategy,
            IDatabaseUserModel databaseUserModel,
            ILogger<SuperUserOnRootDb> logger)
        {
            this.databaseNameProvider = databaseNameProvider;
            this.roleProvider = roleProvider;
            this.createUsersStrategy = createUsersStrategy;
            this.databaseUserModel = databaseUserModel;
            this.logger = logger;
            this.npgsqlDataSource = npgsqlDataSource;
        }
        public async Task CreateDatabaseAsync()
        {
            var connectionStringBuilder = new NpgsqlConnectionStringBuilder(npgsqlDataSource.ConnectionString);

            string dbName = databaseNameProvider.AppDbName;

            await using var checkDbExists = npgsqlDataSource.CreateCommand($"SELECT 1 FROM pg_database WHERE datname='{dbName}'");
            object? result = await checkDbExists.ExecuteScalarAsync();
            if(result is int count && count == 1)
            {
                logger.LogInformation($"Skiping creation of db {dbName} because database already exists on host {connectionStringBuilder.Host}");
            }
            else
            {
                logger.LogInformation($"Start creating DB {dbName} on server {connectionStringBuilder.Host} and db {connectionStringBuilder.Database}");
                await using var command = npgsqlDataSource.CreateCommand($"create database \"{dbName}\"");
                await command.ExecuteNonQueryAsync();
            }

            await CreateAppRolesAsync();
        }

        public async Task DropDatabaseAsync()
        {
            string dbName = databaseNameProvider.AppDbName;
            await using var command = npgsqlDataSource.CreateCommand($"drop database \"{dbName}\" with (force)");
            await command.ExecuteNonQueryAsync();
        }

        public async Task CreateAppRolesAsync()
        {
            NpgsqlConnectionStringBuilder conStrBuilder = new NpgsqlConnectionStringBuilder(npgsqlDataSource.ConnectionString);
            logger.LogInformation($"Start creating roles on DB {conStrBuilder.Database}");

            await CreateRoleAsync(roleProvider.ReadOnlyRole);

            await CreateRoleAsync(roleProvider.ReadWriteRole);

            await CreateRoleAsync(roleProvider.DdlMigrationRole);

            await createUsersStrategy.CreateUsers();
            await GrantRoleToUserAsync(databaseUserModel.ApplicationUser.UserName, roleProvider.ReadWriteRole);
            await GrantRoleToUserAsync(databaseUserModel.MigrationUser.UserName, roleProvider.DdlMigrationRole);
        }

        private async Task CreateRoleAsync(string roleName)
        {
            await using var checkDbRoleExistsCommand = npgsqlDataSource.CreateCommand($"SELECT 1 FROM pg_roles WHERE rolname='{roleName}'");
            object? result = await checkDbRoleExistsCommand.ExecuteScalarAsync();
            if (result is int count && count == 1)
            {
                logger.LogInformation($"Skiping creation of role {roleName} because role already exists");
                return;
            }

            await using var command = npgsqlDataSource.CreateCommand($"create role \"{roleName}\"");
            await command.ExecuteNonQueryAsync();
        }

        private async Task GrantRoleToUserAsync(string userName, string roleName)
        {
            await using var command = npgsqlDataSource.CreateCommand($"grant \"{roleName}\" to \"{userName}\"");
            await command.ExecuteNonQueryAsync();
        }
    }
}
