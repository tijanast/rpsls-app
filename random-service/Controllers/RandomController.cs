using Microsoft.AspNetCore.Mvc;
using Rpsls.Contracts;

namespace RandomService.Controllers;

/// <summary>
/// Provides random game choices for Rock-Paper-Scissors-Lizard-Spock.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class RandomController : ControllerBase
{
    private readonly Random _rng = new();

    /// <summary>
    /// Returns a randomly selected choice.
    /// </summary>
    /// <returns>A <see cref="RandomChoiceDto"/> containing the random choice.</returns>
    [HttpGet("choice")]
    public ActionResult<RandomChoiceDto> GetChoice()
        => Ok(new RandomChoiceDto(GameChoices.All[_rng.Next(GameChoices.All.Length)]));
}
