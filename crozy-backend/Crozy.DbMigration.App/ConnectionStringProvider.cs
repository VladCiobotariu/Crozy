using Crozy.Infrastructure.PostgreSQL.ConnectionStrings;
using Crozy.Infrastructure.PostgreSQL.UserStrategies;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Crozy.DbMigration.App
{
    public class ConnectionStringProvider
    {
        private readonly string rootDbConnectionString;
        private readonly DatabaseNameProvider databaseNameProvider;
        private readonly IDatabaseUserModel databaseUserModel;

        public ConnectionStringProvider(
            DatabaseNameProvider databaseNameProvider,
            IDatabaseUserModel databaseUserModel,
            IConfiguration configuration)
        {
            this.rootDbConnectionString = configuration.GetConnectionString(ConnectionStringConstants.MigrationsAppSuperUserConnectionStringKey) ??
                throw new InvalidOperationException($"Connectoin string with key '{ConnectionStringConstants.MigrationsAppSuperUserConnectionStringKey}' not found");
            this.databaseNameProvider = databaseNameProvider;
            this.databaseUserModel = databaseUserModel;
        }

        public string SuperUserOnRootDbConnectionString()
        {
            NpgsqlConnectionStringBuilder builder = new NpgsqlConnectionStringBuilder(rootDbConnectionString);
            builder.Database = databaseNameProvider.RootDbName;
            return builder.ConnectionString;
        }

        public string SuperUserOnAppDbConnectionString()
        {
            NpgsqlConnectionStringBuilder builder = new NpgsqlConnectionStringBuilder(rootDbConnectionString);
            builder.Database = databaseNameProvider.AppDbName;

            return builder.ConnectionString;
        }

        public string MigrationUserOnAppDbConnectionString()
        {
            NpgsqlConnectionStringBuilder builder = new NpgsqlConnectionStringBuilder(rootDbConnectionString);
            builder.Database = databaseNameProvider.AppDbName;
            builder.Username = databaseUserModel.MigrationUser.UserName;

            return builder.ConnectionString;
        }
    }
}
