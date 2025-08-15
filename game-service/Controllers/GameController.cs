using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;
using GameService.Services;
using Rpsls.Contracts;
using MediatR;
using GameService.Queries;
using GameService.Commands;

namespace GameService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private readonly IMediator _mediator;

    /// <summary>
    /// Initializes a new instance of <see cref="GameController"/>.
    /// </summary>
    /// <param name="clients">Factory for creating HTTP clients to call other services.</param>
    public GameController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Retrieves the list of possible game choices.
    /// </summary>
    /// <returns>A list of strings representing the valid choices: Rock, Paper, Scissors, Lizard, Spock.</returns>
    [HttpGet("choices")]
    public async Task<IActionResult> Choices()
        => Ok(await _mediator.Send(new GetChoicesQuery()));

    /// <summary>
    /// Plays a round of Rock-Paper-Scissors-Lizard-Spock.
    /// </summary>
    /// <param name="req">Player's name and choice.</param>
    /// <returns>Player's choice, computer's choice, and round result.</returns>
    [HttpPost("play")]
    public async Task<IActionResult> Play([FromBody] PlayGameCommand command)
        => Ok(await _mediator.Send(command));
}
