using Microsoft.Azure.Functions.Worker;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Options;

namespace Crozy.GraphQLApi
{
    record SeedResponse(string Message);

    public class SeedFunction
    {
        private readonly DbSeederService dbSeederService;
        private readonly IOptions<SeedOptions> options;

        public SeedFunction(DbSeederService dbSeederService, IOptions<SeedOptions> options)
        {
            this.dbSeederService = dbSeederService;
            this.options = options;
        }

        [Function("seed-timer")]
        public IActionResult SetupDb([TimerTrigger("99999.00:00:00", RunOnStartup = true)] TimerInfo timerInfo)
        {
            if (!options.Value.DbSeedEnabled)
            {
                return new BadRequestObjectResult(new { message="Seed functionality is disabled" });
            }

            dbSeederService.Initialize();

            return new OkObjectResult(new SeedResponse("In Memory DB initialized with success"));
        }

        [Function("seed")]
        public IActionResult Seed(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "seed")]
            HttpRequestData request)
        {
            if (!options.Value.DbSeedEnabled)
            {
                return new BadRequestObjectResult(new { message = "Seed functionality is disabled" });
            }

            dbSeederService.Initialize();

            return new OkObjectResult(new SeedResponse("In Memory DB initialized with success"));
        }
    }
}
