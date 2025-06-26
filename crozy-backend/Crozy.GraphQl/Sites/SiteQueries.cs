using Crozy.Domain.Sites;
using Crozy.GraphQL.DataLoader;
using Crozy.GraphQL.Types;
using Crozy.GraphQL.Types.FilterTypes;
using Crozy.Infrastructure;

namespace Crozy.GraphQL.Sites
{
    [ExtendObjectType(GraphQLTypes.Query)]
    public class SiteQueries
    {
        [UsePaging]
        [UseFiltering(typeof(SiteFilterType))]
        [UseSorting]
        public IQueryable<Site> GetSites(CrozyDbContext context)
        {
            return context.Sites;
        }

        public Task<Site> GetSiteByIdAsync(
            [ID(nameof(Site))] long id,
            SiteByIdDataLoader siteById,
            CancellationToken cancellationToken) =>
            siteById.LoadAsync(id, cancellationToken);
        public Task<Site> GetSiteBySlugAsync(
            string slug,
            SiteBySlugDataLoader siteBySlug,
            CancellationToken cancellationToken) =>
            siteBySlug.LoadAsync(slug, cancellationToken);
    }
}
