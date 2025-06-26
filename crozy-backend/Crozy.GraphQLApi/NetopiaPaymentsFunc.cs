using Crozy.Payments.Netopia;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;

namespace Crozy.GraphQLApi
{
    public class NetopiaPaymentsFunc
    {
        private readonly ILogger<NetopiaPaymentsFunc> _logger;
        private readonly RequestsHandler requestsHandler;

        public NetopiaPaymentsFunc(ILogger<NetopiaPaymentsFunc> logger, RequestsHandler requestsHandler)
        {
            _logger = logger;
            this.requestsHandler = requestsHandler;
        }

        [Function("NetopiaPaymentsConfirmation")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post", "get", Route="payments/netopia/confirmation")] HttpRequest req)
        {
            IFormCollection formData = await req.ReadFormAsync();
            string? data = formData["data"];
            string? envKey = formData["env_key"];
            string? cipher = formData["cipher"];
            string? iv = formData["iv"];

            // TODO: handle missing parameters
            string xmlResponse = await requestsHandler.Confirmation(req.Method, data, envKey, cipher, iv);

            _logger.LogInformation("formData", formData);
            _logger.LogInformation($"Sending CRC to Netopia ${nameof(xmlResponse)}", xmlResponse);
            return new OkObjectResult(xmlResponse);
        }
    }
}
