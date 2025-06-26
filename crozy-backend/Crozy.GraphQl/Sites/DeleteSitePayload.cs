using Crozy.Domain;
using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Sites
{
    public class DeleteSitePayload : Payload
    {
        
        public DeleteSitePayload(bool deleted)
        {
            Deleted = deleted;
        }

        public DeleteSitePayload(IReadOnlyList<UserError> errors) : base(errors) { }

        public bool Deleted { get; }
    }
}
