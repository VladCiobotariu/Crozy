using Microsoft.Extensions.Configuration;

namespace Crozy.Infrastructure.PostgreSQL
{
    public static class MigrationsConfiguration
    {
        public static IConfigurationBuilder Create()
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "local";

            return new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("config.json", optional: false)
                .AddJsonFile($"config.{env}.json", optional: true)
                ;
        }
    }
}
