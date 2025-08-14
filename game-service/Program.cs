using Rpsls.Contracts;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// TODO: move to appsettings
var randomBase = Environment.GetEnvironmentVariable("RANDOM_SERVICE_URL") ?? "http://random-service";
var scoreboardBase = Environment.GetEnvironmentVariable("SCOREBOARD_SERVICE_URL") ?? "http://scoreboard-service";

builder.Services.AddHttpClient("RandomService", c => c.BaseAddress = new Uri(randomBase));
builder.Services.AddHttpClient("ScoreboardService", c => c.BaseAddress = new Uri(scoreboardBase));

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(80);
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); app.UseSwaggerUI();
}

// TODO: chc
// app.UseHttpsRedirection();
app.MapControllers();
app.Run();
