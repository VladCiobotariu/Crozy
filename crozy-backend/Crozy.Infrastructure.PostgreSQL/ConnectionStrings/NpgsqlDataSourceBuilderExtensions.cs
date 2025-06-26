using Azure.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;
using static System.Formats.Asn1.AsnWriter;

namespace Crozy.Infrastructure.PostgreSQL.ConnectionStrings
{
    public static class NpgsqlDataSourceBuilderExtensions
    {
        public static NpgsqlDataSourceBuilder ConfigureDbAuthMode(this NpgsqlDataSourceBuilder builder, IServiceProvider serviceProvider, IConfiguration configuration)
        {
            builder.UseLoggerFactory(serviceProvider.GetRequiredService<ILoggerFactory>());
            if(configuration.AzureManagedIdentityAuthMode())
            {
                DefaultAzureCredential azureCredential = serviceProvider.GetRequiredService<DefaultAzureCredential>();
                async ValueTask<string> GetAccessToken(NpgsqlConnectionStringBuilder connBuilder, CancellationToken cancellationToken)
                {
                    var token = await azureCredential.GetAccessToken(cancellationToken);
                    return token;
                }
                builder.UsePeriodicPasswordProvider(GetAccessToken, TimeSpan.FromMinutes(5), TimeSpan.FromSeconds(5));
            }
            return builder;
        }

        
    }
}
