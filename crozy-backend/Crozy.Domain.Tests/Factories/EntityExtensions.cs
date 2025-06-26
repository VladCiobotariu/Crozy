namespace Crozy.Domain.Tests.Factories
{
    public static class EntityExtensions
    {
        public static TEntity WithPeristed<TEntity>(this TEntity entity, long id)
            where TEntity : Entity
        {
            var property = typeof(Entity)?.GetProperty(nameof(Entity.Id));

            property?.SetValue(entity, id, System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.SetProperty, binder: null, index: null, culture: null);
            
            return entity;
        }
    }
}
