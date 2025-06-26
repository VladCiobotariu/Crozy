using Crozy.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace Crozy.DbMigration.App
{
    public static class DbLogFormatter
    {
        public static string GetDbInfo(string connectionString)
        {
            var builder = new NpgsqlConnectionStringBuilder(connectionString);
            return $"Host: {builder.Host}, Db: {builder.Database}, User: {builder.Username}";
        }

        public static string GetDbInfo(this CrozyDbContext dbContext)
        {
            var connectionString = dbContext.Database.GetConnectionString();
            if(connectionString is null)
            {
                return "";
            }
            return GetDbInfo(connectionString);
        }
    }
}
