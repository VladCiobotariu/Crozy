using Crozy.Domain.Sites;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sites
{
    public class AddSitePayload : SitePayloadBase
    {
        public AddSitePayload(Site site) : base(site)
        {
        }

        public AddSitePayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }
    }
}
