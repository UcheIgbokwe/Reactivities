using Application.Interfaces;
using Application.Photos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Infrastructure.Photos
{
    public class AzurePhotoAccessor : IPhotoAccessor
    {
        private readonly IOptions<AzureSettings> _config;
        public AzurePhotoAccessor(IOptions<AzureSettings>config)
        {
            _config = config;
        }

        public int AddAzurePhoto(IFormFile file)
        {
            CloudStorageAccount mycloudStorageAccount  = CloudStorageAccount.Parse(_config.Value.ConnectionString);
            CloudBlobClient blobClient = mycloudStorageAccount.CreateCloudBlobClient();  
            CloudBlobContainer container = blobClient.GetContainerReference(_config.Value.ContainerName);

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    CloudBlockBlob cloudBlockBlob = container.GetBlockBlobReference(file.FileName);  
                    cloudBlockBlob.Properties.ContentType = file.ContentType; 
                    var result = cloudBlockBlob.UploadFromStreamAsync(stream);

                    return result.Id;
                   
                }
            }
            throw new System.NotImplementedException();
        }

        public PhotoUploadResult AddPhoto(IFormFile file)
        {
            throw new System.NotImplementedException();
        }

        public string DeletePhoto(string publicId)
        {
            throw new System.NotImplementedException();
        }
    }
}