using Microsoft.EntityFrameworkCore;
using MusicService.Data;

var builder = WebApplication.CreateBuilder(args);

// ============================================================
// 1. SERVICES CONFIGURATION (Dependency Injection)
// ============================================================

// Add Controllers
builder.Services.AddControllers();

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure EF Core with SQL Server
builder.Services.AddDbContext<MusicDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Health Checks
builder.Services.AddHealthChecks()
    .AddDbContextCheck<MusicDbContext>();

// CORS Policies
builder.Services.AddCors(options => {
    options.AddPolicy("AllowFrontend", policy => {
        policy.AllowAnyOrigin() // In production, replace with your Azure URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();

// ============================================================
// 2. MIDDLEWARE PIPELINE
// ============================================================

// Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Remove HTTPS redirect for local development
// app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

// ============================================================
// 3. PORT CONFIGURATION
// ============================================================
// Use port 5000 for local development, or Azure's PORT env variable
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Urls.Add($"http://*:{port}");

// ============================================================
// 4. RUN APP
// ============================================================
app.Run();
