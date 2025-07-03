using Amazon.S3;
using Amazon.S3.Model;
using Crozy.GraphQL.Clients;
using HotChocolate.Types;

namespace Crozy.Infrastructure.Application.Clients;

public class AmazonMediaServiceClient : IMediaServiceClient
{
    private readonly IAmazonS3 s3Client;
        private readonly string bucketName = "crozy-images";
        private readonly string[] allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };

        public AmazonMediaServiceClient(IAmazonS3 s3Client)
        {
            this.s3Client = s3Client;
        }

        public async Task<string> UploadImageAsync(string name, IFile file, CancellationToken cancellationToken)
        {
            var fileName = Guid.NewGuid().ToString();
            var extension = Path.GetExtension(file.Name)?.ToLower();

            if (string.IsNullOrWhiteSpace(extension) || !allowedExtensions.Contains(extension))
            {
                throw new InvalidOperationException($"Invalid file extension: {extension}");
            }

            fileName = $"{fileName}{extension}";

            using var stream = file.OpenReadStream();
            var putRequest = new PutObjectRequest
            {
                BucketName = bucketName,
                Key = fileName,
                InputStream = stream,
                ContentType = file.ContentType
            };

            await s3Client.PutObjectAsync(putRequest, cancellationToken);

            return fileName;
        }

        public async Task<string> CreateProductImageAsync(string tempImageName, string newFileName, CancellationToken cancellationToken)
        {
            await CopyAndDeleteAsync(tempImageName, newFileName, cancellationToken);
            return newFileName;
        }

        public async Task<string> UpdateProductImageAsync(string tempImageName, string newFileName, CancellationToken cancellationToken)
        {
            await s3Client.DeleteObjectAsync(bucketName, newFileName, cancellationToken);
            await CopyAndDeleteAsync(tempImageName, newFileName, cancellationToken);
            return newFileName;
        }

        public async Task DeleteImageAsync(string image, CancellationToken cancellationToken)
        {
            await s3Client.DeleteObjectAsync(bucketName, image, cancellationToken);
        }

        private async Task CopyAndDeleteAsync(string sourceKey, string destKey, CancellationToken cancellationToken)
        {
            var request = new CopyObjectRequest
            {
                SourceBucket = bucketName,
                SourceKey = sourceKey,
                DestinationBucket = bucketName,
                DestinationKey = destKey
            };

            await s3Client.CopyObjectAsync(request, cancellationToken);
            await s3Client.DeleteObjectAsync(bucketName, sourceKey, cancellationToken);
        }
}