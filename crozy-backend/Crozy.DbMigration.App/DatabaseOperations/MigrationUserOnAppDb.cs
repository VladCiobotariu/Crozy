using Crozy.Infrastructure;
using Crozy.Infrastructure.PostgreSQL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Crozy.DbMigration.App.DatabaseOperations
{

    public class MigrationUserOnAppDb : IMigrationUserOnAppDb
    {
        private readonly CrozyDbContext crozyDbContext;
        private readonly RoleProvider roleProvider;
        private readonly ILogger<MigrationUserOnAppDb> logger;

        public MigrationUserOnAppDb(
            CrozyDbContext crozyDbContext, 
            RoleProvider roleProvider,
            ILogger<MigrationUserOnAppDb> logger)
        {
            this.crozyDbContext = crozyDbContext;
            this.roleProvider = roleProvider;
            this.logger = logger;
        }

        public async Task MigrateAsync()
        {
            await crozyDbContext.Database.MigrateAsync();
            await GrantReadOnlyOnPublicSchemaToRoleAsync(roleProvider.ReadOnlyRole);
            await GrantReadWriteOnPublicSchemaToRoleAsync(roleProvider.ReadWriteRole);
            await GrantRoleToUserAsync(roleProvider.DdlMigrationRole, roleProvider.ReadWriteRole);
        }

        private async Task GrantRoleToUserAsync(string userName, string roleName)
        {
            logger.LogInformation($"Granting role '{roleName}' to user '{userName}' on {crozyDbContext.GetDbInfo()}");
#pragma warning disable EF1002 // Risk of vulnerability to SQL injection.
            await crozyDbContext.Database.ExecuteSqlRawAsync($"grant \"{roleName}\" to \"{userName}\"");
#pragma warning restore EF1002 // Risk of vulnerability to SQL injection.
        }

        private async Task GrantReadOnlyOnPublicSchemaToRoleAsync(string roleName)
        {

            logger.LogInformation($"Granting readonly to role '{roleName}' on {crozyDbContext.GetDbInfo()}");
#pragma warning disable EF1002 // Risk of vulnerability to SQL injection.
            await crozyDbContext.Database.ExecuteSqlRawAsync($"grant select on all tables in schema \"public\" to \"{roleName}\"");
#pragma warning restore EF1002 // Risk of vulnerability to SQL injection.
        }

        private async Task GrantReadWriteOnPublicSchemaToRoleAsync(string roleName)
        {
            logger.LogInformation($"Granting read-write to role '{roleName}' on {crozyDbContext.GetDbInfo()}");
#pragma warning disable EF1002 // Risk of vulnerability to SQL injection.
            
            await crozyDbContext.Database.ExecuteSqlRawAsync($"grant select,insert,delete,update on all tables in schema \"public\" to \"{roleName}\"");
            await crozyDbContext.Database.ExecuteSqlRawAsync($"grant usage,select,update on all sequences in schema \"public\" to \"{roleName}\"");
#pragma warning restore EF1002 // Risk of vulnerability to SQL injection.
        }
    }
}
