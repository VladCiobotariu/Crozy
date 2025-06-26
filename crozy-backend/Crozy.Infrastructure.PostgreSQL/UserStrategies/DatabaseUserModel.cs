namespace Crozy.Infrastructure.PostgreSQL.UserStrategies
{
    public interface IDatabaseUserModel
    {
        IDatabaseUser ApplicationUser { get; }

        IDatabaseUser MigrationUser { get; }
    }
}
