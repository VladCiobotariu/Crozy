// See https://aka.ms/new-console-template for more information
using Azure.Identity;
using Crozy.DbMigration.App;
using Crozy.DbMigration.App.DatabaseOperations;
using Crozy.DbMigration.App.UserStrategies;
using Crozy.Infrastructure;
using Crozy.Infrastructure.PostgreSQL;
using Crozy.Infrastructure.PostgreSQL.AppEnvironments;
using Crozy.Infrastructure.PostgreSQL.ConnectionStrings;
using Crozy.Infrastructure.PostgreSQL.UserStrategies;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;

IConfiguration configuration = MigrationsConfiguration
    .Create()
    .AddEnvironmentVariables()
    .AddCommandLine(args)
    .Build();


IServiceCollection services = new ServiceCollection();
services.AddSingleton(configuration);
services.AddLogging(builder=>builder.AddConsole());

services.AddSingleton<AppEnvironment>(provider => configuration.GetEnvironment());

services.AddDbContext<CrozyDbContext>((provider, builder)=>
{
    var connectionStringProvider = provider.GetRequiredService<ConnectionStringProvider>();

    builder.AddPostgreSQLWithMigrations(
        provider,
        configuration,
        //connectionStringProvider.MigrationUserOnAppDbConnectionString() // TODO: this should use MigrationUser, not Root user
        connectionStringProvider.SuperUserOnAppDbConnectionString()
        );
});

services.AddScoped<ISuperUserOnRootDb, SuperUserOnRootDb>();

services.AddKeyedSingleton<NpgsqlDataSource>(Consts.SuperUserOnRootDbDataSourceKey, (provider, key) => 
{
    var connectionStringProvider = provider.GetRequiredService<ConnectionStringProvider>();
    var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionStringProvider.SuperUserOnRootDbConnectionString());
    dataSourceBuilder.ConfigureDbAuthMode(provider, configuration);
    var dataSource = dataSourceBuilder.Build();
    return dataSource;
});

services.AddKeyedSingleton<NpgsqlDataSource>(Consts.SuperUserOnAppbDataSourceKey, (provider, key) =>
{
    var connectionStringProvider = provider.GetRequiredService<ConnectionStringProvider>();
    var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionStringProvider.SuperUserOnAppDbConnectionString());
    dataSourceBuilder.ConfigureDbAuthMode(provider, configuration);
    var dataSource = dataSourceBuilder.Build();
    return dataSource;
});

services.AddScoped<ISuperUserOnAppDb, SuperUserOnAppDb>();

services.AddScoped<IMigrationUserOnAppDb, MigrationUserOnAppDb>();

services
    .AddSingleton<DefaultAzureCredential>()
    .AddScoped<ConnectionStringProvider>()
    .AddSingleton<DatabaseNameProvider>()
    .AddScoped<IDatabaseUserAdapter, DatabaseUserAdapter>()
    .AddScoped(x => configuration.GetUserModel(x.GetRequiredService<AppEnvironment>()))
    .AddScoped(x => configuration.CreateRolesStrategy(x.GetRequiredService<IDatabaseUserAdapter>(), x.GetRequiredService<AppEnvironment>()))
    .AddScoped<RoleProvider>()
    .AddSingleton(x => ApplicationAction.FromConfig(configuration))
    .AddScoped<ApplicationRunner>()
    ;

IServiceProvider serviceProvider = services.BuildServiceProvider();

ILogger logger = serviceProvider.GetRequiredService<ILogger<Program>>();

ApplicationRunner applicationRunner = serviceProvider.GetRequiredService<ApplicationRunner>();

try
{
    await applicationRunner.Run();
}
catch (Exception ex)
{
    logger.LogError(ex, "Application run failed with exception");
    throw;
}


Console.WriteLine("All operations completed");
