using Crozy.Infrastructure.PostgreSQL.AppEnvironments;

namespace Crozy.Infrastructure.PostgreSQL
{
    public class RoleProvider
    {
        public RoleProvider(AppEnvironment appEnvironment)
        {
            ReadOnlyRole = $"crozy_{appEnvironment.Name}_ro";
            ReadWriteRole = $"crozy_{appEnvironment.Name}_rw";
            DdlMigrationRole = $"crozy_{appEnvironment.Name}_ddl";
        }

        public string ReadOnlyRole { get; init; }

        public string ReadWriteRole { get; init; }
        
        public string DdlMigrationRole { get; init; }

    }
}
