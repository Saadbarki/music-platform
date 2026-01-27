namespace MusicService.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Artist { get; set; } = string.Empty;
        public string BlobUrl { get; set; } = string.Empty;
        public DateTime UploadedAt { get; set; }
    }
}
