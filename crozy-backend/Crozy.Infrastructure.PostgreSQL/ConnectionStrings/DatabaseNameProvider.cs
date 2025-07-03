using Crozy.Infrastructure.PostgreSQL.AppEnvironments;

namespace Crozy.Infrastructure.PostgreSQL.ConnectionStrings
{
    public class DatabaseNameProvider
    {
        private readonly AppEnvironment appEnvironment;

        public DatabaseNameProvider(AppEnvironment appEnvironment)
        {
            this.appEnvironment = appEnvironment;
        }
        public string AppDbName => $"pg-crozy-serverless";

        public string RootDbName => "pg-crozy-serverless";
    }
}
