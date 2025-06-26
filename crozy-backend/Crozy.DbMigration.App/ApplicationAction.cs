using Microsoft.Extensions.Configuration;

namespace Crozy.DbMigration.App
{
    public class ApplicationAction
    {
        public ApplicationAction(string name)
        {
            Name = name;
        }

        public string Name { get; }

        public static ApplicationAction FromConfig(IConfiguration configuration)
        {
            var action = configuration.GetValue<string>("action") ?? "migrate";
            return new ApplicationAction(action);
        }
    }
}
