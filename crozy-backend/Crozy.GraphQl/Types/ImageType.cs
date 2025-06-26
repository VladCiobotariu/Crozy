using Crozy.GraphQL.ConfigurationOptions;
using Crozy.GraphQL.Images;
using HotChocolate.Types;
using Microsoft.Extensions.Options;

namespace Crozy.GraphQL.Types
{
    public class Image
    {
        public string Name { get; set; } = default!;

        public string Url(ImageUrlProvider provider)
        {
            return provider.GetImageUrl(Name);
        }
    }

    public class ImageType : ObjectType<Image>
    {
        protected override void Configure(IObjectTypeDescriptor<Image> descriptor)
        {
        }
    }
}
