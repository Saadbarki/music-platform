using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Threading.Tasks;

namespace MusicService.Services
{
    public class BlobStorageService
    {
        private readonly BlobContainerClient _container;

        public BlobStorageService(IConfiguration config)
        {
            var conn = config["BlobStorage:ConnectionString"];
            var containerName = config["BlobStorage:ContainerName"];
            _container = new BlobContainerClient(conn, containerName);
            _container.CreateIfNotExists();
        }

        public async Task<string> UploadSongAsync(Stream fileStream, string fileName)
        {
            var blobClient = _container.GetBlobClient(fileName);
            await blobClient.UploadAsync(fileStream, true);
            return blobClient.Uri.ToString();
        }
    }
}
