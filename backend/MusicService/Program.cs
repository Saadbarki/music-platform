using Microsoft.EntityFrameworkCore;
using MusicService.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. SERVICES
// ============================================================
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHealthChecks();

// SWAGGER CONFIGURATION
builder.Services.AddSwaggerGen();

// CORS CONFIGURATION
// This allows your Angular app to talk to this API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// DATABASE CONFIGURATION
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<MusicDbContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();

// 2. MIDDLEWARE PIPELINE
// ============================================================

// Enable Swagger for BOTH Local and Azure
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Music API V1");
    c.RoutePrefix = string.Empty; // Makes Swagger the home page
});

// SERVE STATIC FILES (MP3s)
// This allows the frontend to access MP3 files from the mp3s folder
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "mp3s")),
    RequestPath = "/music",
    OnPrepareResponse = ctx =>
    {
        // Enable CORS for audio files
        ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
    }
});

app.UseRouting();

// Use the CORS policy we defined above
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
