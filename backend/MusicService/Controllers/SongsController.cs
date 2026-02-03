using Microsoft.AspNetCore.Mvc;
using MusicService.Data;
using MusicService.Models;
using System.Text.RegularExpressions;

namespace MusicService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SongsController : ControllerBase
    {
        private readonly MusicDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public SongsController(MusicDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        [HttpGet("all")]
        public IActionResult GetAllSongs()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var mp3sPath = Path.Combine(_environment.ContentRootPath, "mp3s");
            
            var songs = new List<Song>();
            var id = 1;

            if (Directory.Exists(mp3sPath))
            {
                var mp3Files = Directory.GetFiles(mp3sPath, "*.mp3");
                
                foreach (var file in mp3Files.OrderBy(f => f))
                {
                    var fileName = Path.GetFileNameWithoutExtension(file);
                    var (title, artist) = ParseFileName(fileName);
                    
                    songs.Add(new Song
                    {
                        Id = id++,
                        Title = title,
                        Artist = artist,
                        BlobUrl = $"{baseUrl}/music/{Uri.EscapeDataString(Path.GetFileName(file))}",
                        UploadedAt = System.IO.File.GetCreationTime(file)
                    });
                }
            }

            return Ok(songs);
        }

        private (string title, string artist) ParseFileName(string fileName)
        {
            // Remove common patterns like "Official Audio", "Official Video", etc.
            fileName = Regex.Replace(fileName, @"\(Official.*?\)", "", RegexOptions.IgnoreCase);
            fileName = Regex.Replace(fileName, @"\[Official.*?\]", "", RegexOptions.IgnoreCase);
            
            // Try to split by common separators: -, |, ft., feat.
            var separators = new[] { " - ", " | ", " ft. ", " ft ", " feat. ", " feat " };
            
            foreach (var separator in separators)
            {
                var parts = fileName.Split(new[] { separator }, StringSplitOptions.RemoveEmptyEntries);
                if (parts.Length >= 2)
                {
                    return (parts[1].Trim(), parts[0].Trim());
                }
            }
            
            // If no separator found, check if it starts with artist name pattern
            // Example: "BOHEMIA - Ek Tera Pyar" or "Karan Aujla - Song"
            var match = Regex.Match(fileName, @"^([A-Z\s&]+)\s*-\s*(.+)$");
            if (match.Success)
            {
                return (match.Groups[2].Value.Trim(), match.Groups[1].Value.Trim());
            }
            
            // Default: entire filename as title
            return (fileName.Trim(), "Unknown Artist");
        }

        [HttpPost("sync")]
        public IActionResult SyncFromDownloads()
        {
            // This endpoint can be called to copy files from Windows Downloads/Songs
            var sourcePath = "/mnt/c/Users/SAAD/Downloads/Songs";
            var destPath = Path.Combine(_environment.ContentRootPath, "mp3s");
            
            try
            {
                if (Directory.Exists(sourcePath))
                {
                    var files = Directory.GetFiles(sourcePath, "*.mp3");
                    foreach (var file in files)
                    {
                        var destFile = Path.Combine(destPath, Path.GetFileName(file));
                        System.IO.File.Copy(file, destFile, overwrite: true);
                    }
                    return Ok(new { message = $"Synced {files.Length} files" });
                }
                return NotFound(new { message = "Source directory not found" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
