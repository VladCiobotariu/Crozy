namespace Crozy.Infrastructure.PostgreSQL.UserStrategies
{
    public record UserPassword(string User, string Password) : IDatabaseUser
    {
        public string UserName => User;
    }
}
