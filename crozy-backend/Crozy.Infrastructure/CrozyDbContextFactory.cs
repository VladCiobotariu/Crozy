using Crozy.Infrastructure.PostgreSQL;
using Crozy.Infrastructure.PostgreSQL.AppEnvironments;
using Crozy.Infrastructure.PostgreSQL.ConnectionStrings;
using Crozy.Infrastructure.PostgreSQL.UserStrategies;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace Crozy.Infrastructure
{
    public class CrozyDbContextFactory : IDesignTimeDbContextFactory<CrozyDbContext>
    {
        public CrozyDbContext CreateDbContext(string[] args)
        {
            Console.WriteLine($"AppDomain.CurrentDomain.BaseDirectory: {AppDomain.CurrentDomain.BaseDirectory}");
            IConfiguration configuration = MigrationsConfiguration
                                            .Create()
                                            .Build();

            ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
                    builder.AddSimpleConsole(options =>
                    {
                        options.IncludeScopes = true;
                        options.SingleLine = true;
                        options.TimestampFormat = "HH:mm:ss ";
                    }));

            ILogger<CrozyDbContextFactory> logger = loggerFactory.CreateLogger<CrozyDbContextFactory>();

            AppEnvironment appEnvironment = configuration.GetEnvironment();
            var optionsBuilder = new DbContextOptionsBuilder<CrozyDbContext>();
            var dbNameProvider = new DatabaseNameProvider(appEnvironment);
            IDatabaseUserModel? databaseUserModel = configuration.GetUserModel(appEnvironment);

            string? rootDbConnectionString = configuration.GetConnectionString(ConnectionStringConstants.MigrationsAppConnectionStringKey);
            if(rootDbConnectionString is null)
            {
                throw new InvalidOperationException("Connection string not found in configuration");
            }

            NpgsqlConnectionStringBuilder builder = new NpgsqlConnectionStringBuilder(rootDbConnectionString);
            builder.Database = dbNameProvider.AppDbName;
            builder.Username = databaseUserModel.MigrationUser.UserName;

            logger.LogInformation($"User name {builder.Username}, Database {builder.Database}");

            var dataSourceBuilder = new NpgsqlDataSourceBuilder(builder.ConnectionString);
            var dataSource = dataSourceBuilder
                .UseLoggerFactory(loggerFactory)
                .Build();

            optionsBuilder.AddPostgreSQLWithMigrations(dataSource);

            return new CrozyDbContext(optionsBuilder.Options);
        }
    }
}
