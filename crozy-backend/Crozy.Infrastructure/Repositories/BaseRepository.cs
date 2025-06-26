namespace Crozy.Infrastructure.Repositories
{
    public class BaseRepository
    {
        protected readonly CrozyDbContext dbContext;

        public BaseRepository(CrozyDbContext dbContext)
        {
            if (dbContext is null)
            {
                throw new ArgumentNullException(nameof(dbContext));
            }

            this.dbContext = dbContext;
        }

        public virtual async Task SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await dbContext.SaveChangesAsync(cancellationToken);
        }

        public ValueTask DisposeAsync()
        {
            return dbContext.DisposeAsync();
        }
    }
}
