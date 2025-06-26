using Crozy.GraphQL.Common;
using Crozy.GraphQL.Types;

namespace Crozy.GraphQL.Images
{
    public abstract class ImagePayloadBase : Payload
    {
        protected ImagePayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        protected ImagePayloadBase(string imageName)
        {
            this.Image = new Image { Name = imageName };
        }

        public Image? Image { get; }
    }
}
