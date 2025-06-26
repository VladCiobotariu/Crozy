using Azure.Storage.Blobs;
using Crozy.GraphQL.Clients;
using HotChocolate.Types;

namespace Crozy.Infrastructure.Clients
{
    public class MediaServiceClient : IMediaServiceClient
    {
        private readonly BlobServiceClient blobServiceClient;
        private readonly string[] allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };

        public MediaServiceClient(BlobServiceClient blobServiceClient)
        {
            this.blobServiceClient = blobServiceClient;
        }

        public async Task<string> UploadImageAsync(string name, IFile file, CancellationToken cancellationToken)
        {
            var fileName = Guid.NewGuid().ToString();
            var extension = Path.GetExtension(file.Name);
            if (extension == null)
            {
                throw new InvalidOperationException("File name must conain extension");
            }
            extension = extension.ToLower();
            if (!allowedExtensions.Contains(extension))
            {
                var allowedExtensionsConcatenated = allowedExtensions.Aggregate((result, current) => $"{result},{current}");
                throw new InvalidOperationException($"Provided file extention {extension} is not allowed. File extention must be one of {allowedExtensionsConcatenated}.");
            }
            fileName = $"{fileName}{extension}";
            var containerClient = blobServiceClient.GetBlobContainerClient("images");
            await containerClient.UploadBlobAsync(fileName, file.OpenReadStream());
            return fileName;
        }
        public async Task<string> CreateProductImageAsync(string tempImageName, string newFileName, CancellationToken cancellationToken)
        {
            var containerClient = blobServiceClient.GetBlobContainerClient("images");

            BlobClient sourceBlob = containerClient.GetBlobClient(tempImageName);
            BlobClient destBlob = containerClient.GetBlobClient(newFileName);

            await destBlob.SyncCopyFromUriAsync(sourceBlob.Uri);

            if (await destBlob.ExistsAsync())
            {

                await sourceBlob.DeleteAsync();

            }
            return newFileName;
        }

        public async Task<string> UpdateProductImageAsync(string tempImageName, string newFileName, CancellationToken cancellationToken)
        {
            var containerClient = blobServiceClient.GetBlobContainerClient("images");

            BlobClient sourceBlob = containerClient.GetBlobClient(tempImageName);
            BlobClient destBlob = containerClient.GetBlobClient(newFileName);
            await destBlob.DeleteIfExistsAsync(cancellationToken: cancellationToken);
            await destBlob.SyncCopyFromUriAsync(sourceBlob.Uri, cancellationToken: cancellationToken);

            if (await destBlob.ExistsAsync(cancellationToken))
            {

                await sourceBlob.DeleteAsync(cancellationToken: cancellationToken);

            }
            return newFileName;
        }

        public async Task DeleteImageAsync(string image, CancellationToken cancellationToken)
        {
            var containerClient = blobServiceClient.GetBlobContainerClient("images");

            BlobClient sourceBlob = containerClient.GetBlobClient(image);
            await sourceBlob.DeleteIfExistsAsync(cancellationToken: cancellationToken);
        }
    }
}
