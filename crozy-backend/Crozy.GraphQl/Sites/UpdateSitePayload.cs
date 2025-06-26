using Crozy.Domain.Sites;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sites
{
    public class UpdateSitePayload : SitePayloadBase
    {
        public UpdateSitePayload(Site site) : base(site) 
        {
        }

        public UpdateSitePayload(IReadOnlyList<UserError> errors) : base(errors)
        { 
        }
    }   
}
