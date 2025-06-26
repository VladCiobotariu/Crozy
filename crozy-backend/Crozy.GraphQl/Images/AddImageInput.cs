using HotChocolate;
using HotChocolate.Types;

namespace Crozy.GraphQL.Images
{
    public class AddImageInput
    {
        [GraphQLType(typeof(NonNullType<UploadType>))]
        public IFile File { get; set; } = default!;

    }
}