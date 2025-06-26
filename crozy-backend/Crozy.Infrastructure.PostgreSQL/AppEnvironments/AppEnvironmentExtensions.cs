using Microsoft.Extensions.Configuration;

namespace Crozy.Infrastructure.PostgreSQL.AppEnvironments
{
    public static class AppEnvironmentExtensions
    {
        public static AppEnvironment GetEnvironment(this IConfiguration configuration)
        {
            string env = configuration["AppEnvironment"] ?? "local";
            return AppEnvironment.From(env);
        }
    }
}
