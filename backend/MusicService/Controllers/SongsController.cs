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

        [HttpPost("test")]
        public IActionResult TestInsert()
        {
            var song = new Song
            {
                Title = "Test Song",
                Artist = "Test Artist",
                BlobUrl = "https://example.com/song.mp3",
                UploadedAt = DateTime.UtcNow
            };

            _context.Songs.Add(song);
            _context.SaveChanges();

            return Ok("Inserted successfully");
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            return Ok(_context.Songs);
        }
    }
}
