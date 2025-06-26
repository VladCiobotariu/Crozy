using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Payments;
using Crozy.GraphQLApi.Authentication;
using Crozy.Infrastructure;
using Crozy.Infrastructure.Application.Extensions;
using Crozy.Infrastructure.Emails;
using Crozy.Infrastructure.Extensions;
using Crozy.Infrastructure.Options;
using Crozy.Messaging.Extensions;
using Crozy.Payments.Netopia;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;
using Npgsql;
using Crozy.Infrastructure.PostgreSQL;
using Crozy.Infrastructure.PostgreSQL.ConnectionStrings;
using Azure.Identity;

var host = new HostBuilder()
    .AddGraphQLFunction(builder =>
    {
        builder.AddCrozyGraphQL()
            .AddMaxExecutionDepthRule(10, skipIntrospectionFields: true);
    })
    .ConfigureFunctionsWebApplication(builder =>
    {
        builder
            .UseMiddleware<AzureFunctionAuthenticationMiddleware>()
            .UseMiddleware<AzureFunctionAuthorizationMidleware>();
    })
    .ConfigureServices((hostBuilderContext, services) =>
    {
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(options =>
            {
                hostBuilderContext.Configuration.Bind("AzureAdB2C", options);
                options.TokenValidationParameters.NameClaimType = "name";
            }, options =>
            {
                hostBuilderContext.Configuration.Bind("AzureAdB2C", options);
            });

        services
            .AddOptions<InfrastructureOptions>()
            .Configure<IConfiguration>((settings, configuration) => configuration.Bind(settings));

        services
            .AddOptions<SeedOptions>()
            .Configure<IConfiguration>((settings, configuration) => configuration.GetSection("SeedOptions").Bind(settings));

        services
            .AddOptions<EmailServiceOptions>()
            .Configure<IConfiguration>((settings, configuration) => configuration.Bind(settings));
        
        services
            .AddOptions<PingTimerFunctionOptions>()
            .Configure<IConfiguration>((settings, configuration) => configuration.Bind(settings));

        services.AddSingleton<DefaultAzureCredential>();

        services.AddSingleton<NpgsqlDataSource>(provider => 
        {
            var runInMemory = provider.GetRequiredService<IOptions<InfrastructureOptions>>().Value.RunInMemoryDB;
            if(runInMemory)
            {
                return null;
            }
            else
            {
                var connectionStringKey = "POSTGRESQLCONNSTR_CrozyAppDb";
                var connectionString = hostBuilderContext.Configuration.GetConnectionString(connectionStringKey);

                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException($"Connection string '{connectionStringKey}' is null or empty");
                }

                var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
                var dataSource = dataSourceBuilder
                    .ConfigureDbAuthMode(provider, provider.GetRequiredService<IConfiguration>())
                    .UseLoggerFactory(provider.GetRequiredService<ILoggerFactory>())
                    .Build();

                return dataSource;
            }
        });

        services
            .AddDbContext<CrozyDbContext>((provider, builder) =>
            {
                var runInMemory = provider.GetRequiredService<IOptions<InfrastructureOptions>>().Value.RunInMemoryDB;
                if (runInMemory)
                {
                    builder.UseInMemoryDatabase("Crozy DB");
                }
                else
                {
                    NpgsqlDataSource dataSource = provider.GetRequiredService<NpgsqlDataSource>();
                    builder.AddPostgreSQLWithMigrations(dataSource);
                }
            });
        
        services.AddGraphQLPolicies();
        services.AddRepositories();
        services.AddNotifications(hostBuilderContext.Configuration);
        services.AddApplicationInfrastructure(hostBuilderContext.Configuration);

        services.AddScoped<DbSeederService>();

        services.AddNetopiaPayments<PaymentsService>();
    })
    .Build();

host.Run();

