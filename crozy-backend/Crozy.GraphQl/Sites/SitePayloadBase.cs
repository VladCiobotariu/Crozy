using Crozy.Domain.Sites;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sites
{
    public abstract class SitePayloadBase : Payload
    {
        protected SitePayloadBase(Site site)
        {
            Site = site;
        }

        protected SitePayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public Site? Site { get; }
    }
}
