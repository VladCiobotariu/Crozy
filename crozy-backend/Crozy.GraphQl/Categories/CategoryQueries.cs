using Crozy.GraphQL.DataLoader;
using Crozy.GraphQL.Types;
using Crozy.Infrastructure;
using Crozy.Domain.Categories;
using Crozy.GraphQL.Types.FilterTypes;

namespace Crozy.GraphQL.Categories
{
    [ExtendObjectType(GraphQLTypes.Query)]
    public class CategoryQueries
    {
        [UsePaging]
        [UseFiltering(typeof(CategoryFilterType))]
        [UseSorting]
        public IQueryable<Category> GetCategories(CrozyDbContext context)
        {
            return context.Categories;
        }

        public Task<Category> GetCategoryByIdAsync(
            [ID(nameof(Category))] long id,
            CategoryByIdDataLoader categoryById,
            CancellationToken cancellationToken) =>
            categoryById.LoadAsync(id, cancellationToken);
    }
}
