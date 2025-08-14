using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;
using GameService.Services;
using Rpsls.Contracts;

namespace GameService.Controllers;

/// <summary>
/// Controller responsible for handling Rock-Paper-Scissors-Lizard-Spock game operations.
/// Provides endpoints for retrieving available choices and playing a game round.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private readonly IHttpClientFactory _clients;

    /// <summary>
    /// Initializes a new instance of <see cref="GameController"/>.
    /// </summary>
    /// <param name="clients">Factory for creating HTTP clients to call other services.</param>
    public GameController(IHttpClientFactory clients) => _clients = clients;

    /// <summary>
    /// Retrieves the list of possible game choices.
    /// </summary>
    /// <returns>A list of strings representing the valid choices: Rock, Paper, Scissors, Lizard, Spock.</returns>
    [HttpGet("choices")]
    public IActionResult Choices() => Ok(new[] { "Rock", "Paper", "Scissors", "Lizard", "Spock" }); // TODO: move choices to service constants.

    /// <summary>
    /// Plays a round of Rock-Paper-Scissors-Lizard-Spock.
    /// </summary>
    /// <param name="req">Player's name and choice.</param>
    /// <returns>Player's choice, computer's choice, and round result.</returns>
    [HttpPost("play")]
    public async Task<IActionResult> Play([FromBody] PlayRequest req)
    {
        var random = _clients.CreateClient("RandomService");
        var scoreboard = _clients.CreateClient("ScoreboardService");

        var randomDto = await random.GetFromJsonAsync<RandomChoiceDto>("api/random/choice");
        var computer = randomDto?.Choice ?? "Rock";

        var result = GameRules.Decide(req.PlayerChoice, computer);

        var create = new CreateScoreRequest(req.PlayerName, req.PlayerChoice, computer, result);
        await scoreboard.PostAsJsonAsync("api/scoreboard", create);

        return Ok(new { req.PlayerName, req.PlayerChoice, ComputerChoice = computer, Result = result });
    }
}
