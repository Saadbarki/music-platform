using Microsoft.EntityFrameworkCore;
using MusicService.Models;

namespace MusicService.Data
{
    public class MusicDbContext : DbContext
    {
        public MusicDbContext(DbContextOptions<MusicDbContext> options) : base(options) { }
        public DbSet<Song> Songs => Set<Song>();
    }
}
