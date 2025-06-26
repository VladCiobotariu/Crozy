using HotChocolate.Types;

namespace Crozy.GraphQL.Clients
{
    public interface IMediaServiceClient
    {
        Task<string> CreateProductImageAsync(string tempImageName, string newFileName, CancellationToken cancellationToken);
        Task DeleteImageAsync(string image, CancellationToken cancellationToken);
        Task<string> UpdateProductImageAsync(string tempImageName, string newFileName, CancellationToken cancellationToken);
        Task<string> UploadImageAsync(string name, IFile file, CancellationToken cancellationToken);
    }
}