using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Crozy.Payments.Netopia
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddNetopiaPayments<T>(this IServiceCollection services) where T : class, IPaymentsProcessor
        {
            services
                .AddOptions<NetopiaPaymentsOptions>()
                .Configure<IConfiguration>((settings, configuration) => 
                {
                    var section = configuration.GetSection("Netopia");
                    section.Bind(settings);
                });
            services
                .AddScoped<IPaymentsProcessor, T>()
                .AddScoped<RequestsHandler>()
                ;

            return services;
        }
    }
}
