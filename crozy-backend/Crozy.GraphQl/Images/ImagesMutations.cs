using Crozy.GraphQL.Types;
using HotChocolate.Types;
using Crozy.GraphQL.Clients;
using Crozy.GraphQL.Auth;
using HotChocolate.Authorization;

namespace Crozy.GraphQL.Images
{
    
    [ExtendObjectType(GraphQLTypes.Mutation)]
    public class ImagesMutations
    {
        [Authorize(Policy = Policies.IsSeller)]
        public async Task<AddImagePayload> AddImageAsync(
            AddImageInput input,
            IMediaServiceClient mediaServiceClient,
            CancellationToken cancellationToken)
        {
            var imageName = await mediaServiceClient.UploadImageAsync(Guid.NewGuid().ToString(), input.File, cancellationToken);
            return new AddImagePayload(imageName);
        }
    }
}
