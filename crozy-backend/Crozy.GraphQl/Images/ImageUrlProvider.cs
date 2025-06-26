using Crozy.GraphQL.ConfigurationOptions;
using Flurl;
using Microsoft.Extensions.Options;

namespace Crozy.GraphQL.Images
{
    public class ImageUrlProvider
    {
        private readonly IOptions<GraphQLConfig> config;

        public ImageUrlProvider(IOptions<GraphQLConfig> config)
        {
            this.config = config ?? throw new ArgumentNullException(nameof(config));
            if(config.Value?.ImageServiceEndpoint == null)
            {
                throw new InvalidOperationException($"{nameof(GraphQLConfig.ImageServiceEndpoint)} configuration is missing.");
            }
            
        }

        public string GetImageUrl(string imageName)
        {
            return Url.Combine(config.Value.ImageServiceEndpoint, imageName);
        }
    }
}
