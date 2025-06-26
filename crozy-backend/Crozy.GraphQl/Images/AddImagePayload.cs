using Crozy.GraphQL.Common;

namespace Crozy.GraphQL.Images
{
    public class AddImagePayload : ImagePayloadBase
    {
        public AddImagePayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }

        public AddImagePayload(string imageName) : base(imageName)
        {
        }
    }
}