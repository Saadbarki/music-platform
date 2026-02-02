using Microsoft.AspNetCore.Mvc;
using MusicService.Data;
using MusicService.Models;

namespace MusicService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SongsController : ControllerBase
    {
        private readonly MusicDbContext _context;

        public SongsController(MusicDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public IActionResult GetAllSongs()
        {
            var songs = new List<Song>
            {
                new Song { Id = 1, Title = "Song 1", Artist = "Artist 1", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(1).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 2, Title = "Song 2", Artist = "Artist 2", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(2).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 3, Title = "Song 3", Artist = "Artist 3", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(3).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 4, Title = "Song 4", Artist = "Artist 4", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(4).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 5, Title = "Song 5", Artist = "Artist 5", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(5).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 6, Title = "Song 6", Artist = "Artist 6", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(6).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 7, Title = "Song 7", Artist = "Artist 7", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(7).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 8, Title = "Song 8", Artist = "Artist 8", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(8).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 9, Title = "Song 9", Artist = "Artist 9", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(9).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 10, Title = "Song 10", Artist = "Artist 10", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(10).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 11, Title = "Song 11", Artist = "Artist 11", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(11).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 12, Title = "Song 12", Artist = "Artist 12", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(12).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 13, Title = "Song 13", Artist = "Artist 13", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(13).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 14, Title = "Song 14", Artist = "Artist 14", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(14).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 15, Title = "Song 15", Artist = "Artist 15", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(15).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 16, Title = "Song 16", Artist = "Artist 16", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(16).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 17, Title = "Song 17", Artist = "Artist 17", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(17).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 18, Title = "Song 18", Artist = "Artist 18", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(18).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 19, Title = "Song 19", Artist = "Artist 19", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(19).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 20, Title = "Song 20", Artist = "Artist 20", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(20).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 21, Title = "Song 21", Artist = "Artist 21", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(21).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 22, Title = "Song 22", Artist = "Artist 22", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(22).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 23, Title = "Song 23", Artist = "Artist 23", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(23).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 24, Title = "Song 24", Artist = "Artist 24", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(24).mp3", UploadedAt = DateTime.UtcNow },
                new Song { Id = 25, Title = "Song 25", Artist = "Artist 25", BlobUrl = "https://musicplatformstorage.blob.core.windows.net/songs/1%20(25).mp3", UploadedAt = DateTime.UtcNow },
            };

            return Ok(songs);
        }
    }
}
