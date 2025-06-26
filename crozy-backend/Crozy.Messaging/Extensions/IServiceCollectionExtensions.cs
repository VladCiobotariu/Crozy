using Crozy.Domain.Services;
using Crozy.Messaging.Options;
using Crozy.Messaging.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SlackAPI;

namespace Crozy.Messaging.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddNotifications(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<NotificationServiceOptions>()
                .Configure<IConfiguration>((settings, configuration) =>
                {
                    configuration.Bind(settings);
                });

            services
                .AddSingleton(services =>
                {
                    var slackToken = configuration.GetValue<string>("SLACK_TOKEN");
                    return new SlackTaskClient(slackToken);
                })
                .AddScoped<INotificationService, NotificationService>()
                ;
            return services;
        }
    }
}
