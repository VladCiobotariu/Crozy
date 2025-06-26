using Crozy.Infrastructure.PostgreSQL.ConnectionStrings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;

namespace Crozy.Infrastructure.PostgreSQL
{
    public static class DbContextOptionsBuilderExtensions
    {
        public const string MigrationsAssemblyName = "Crozy.DbMigrations";
        public static DbContextOptionsBuilder AddPostgreSQLWithMigrations(
            this DbContextOptionsBuilder builder,
            IServiceProvider serviceProvider,
            IConfiguration configuration,
            string connectionString)
        {
            builder.AddPostgreSQL(
                serviceProvider,
                configuration,
                connectionString,
                x => x.MigrationsAssembly(MigrationsAssemblyName));
            return builder;
        }

        public static DbContextOptionsBuilder AddPostgreSQLWithMigrations(
            this DbContextOptionsBuilder builder,
            NpgsqlDataSource dataSource
            )
        {
            builder.UseNpgsql(dataSource, x => x.MigrationsAssembly(MigrationsAssemblyName));
            return builder;
        }


        public static DbContextOptionsBuilder AddPostgreSQL(
            this DbContextOptionsBuilder builder,
            IServiceProvider serviceProvider,
            IConfiguration configuration,
            string connectionString,
            Action<NpgsqlDbContextOptionsBuilder>? npgsqlOptionsAction = null)
        {
            var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
            dataSourceBuilder.ConfigureDbAuthMode(serviceProvider, configuration);
            var dataSource = dataSourceBuilder.Build();

            builder.UseNpgsql(dataSource, npgsqlOptionsAction);
                
            return builder;
        }

        public static bool AzureManagedIdentityAuthMode(this IConfiguration configuration)
        {
            string? dbAuthMode = configuration.GetValue<string>("DbAuthMode");
            return dbAuthMode == "ManagedIdentity";
        }
    }
}
