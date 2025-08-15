using System.Reflection;
using GameService.Adapters;
using GameService.Interfaces;
using MediatR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMediatR(Assembly.GetExecutingAssembly());

// TODO: move to appsettings
var randomBase = Environment.GetEnvironmentVariable("RANDOM_SERVICE_URL") ?? "http://localhost:5003";;
var scoreboardBase = Environment.GetEnvironmentVariable("SCOREBOARD_SERVICE_URL") ?? "http://localhost:5002";

builder.Services.AddHttpClient<IRandomChoiceClient, RandomChoiceClient>(client =>
{
    client.BaseAddress = new Uri(randomBase);
});

builder.Services.AddHttpClient<IScoreboardClient, ScoreboardClient>(client =>
{
    client.BaseAddress = new Uri(scoreboardBase);
});



builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(80);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();
