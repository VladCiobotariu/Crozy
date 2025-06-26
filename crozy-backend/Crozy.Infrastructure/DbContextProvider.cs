namespace Crozy.Infrastructure
{
    public class DbContextProvider 
    {
        public DbContextProvider(CrozyDbContext dbContext)
        {
            if (dbContext is null)
            {
                throw new ArgumentNullException(nameof(dbContext));
            }

            this.DbContext = dbContext;
        }

        public CrozyDbContext DbContext { get; private set; }
    }
}
