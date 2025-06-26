using Crozy.Infrastructure;
using Crozy.Infrastructure.Options;
using HotChocolate.AzureFunctions;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Crozy.GraphQLApi
{
    public class TimerFunction
    {
        private readonly ILogger<TimerFunction> _logger;
        private readonly IOptions<PingTimerFunctionOptions> options;
        static readonly HttpClient client = new HttpClient();
        
        public TimerFunction(ILogger<TimerFunction> logger, IOptions<PingTimerFunctionOptions> options)
        {
            this.options = options;
            _logger = logger;
        }

        [Function("timerGraphQL")]
        public async Task TimerActionResult([TimerTrigger("0 */3 * * * *", RunOnStartup = true)] TimerInfo timerInfo)
        {
            if (options.Value.PingTimerFunction)
            {
                var response = await client.GetAsync(options.Value.PingUri);
                response.EnsureSuccessStatusCode();
                var statusCode = response.StatusCode;
                _logger.Log(LogLevel.Information, "Timer Trigger initiated, ping ran with code: {}.", statusCode);
            }
            else
            {
                _logger.Log(LogLevel.Information, "Timer Trigger initiated, ping did not ran.");
            }
        }
    }
}
