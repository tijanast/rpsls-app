using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rpsls.Contracts;
using RandomService.Application.Queries;

namespace RandomService.Controllers;

/// <summary>
/// Provides random game choices for Rock-Paper-Scissors-Lizard-Spock.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class RandomController : ControllerBase
{
    private readonly IMediator _mediator;

    public RandomController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Returns a randomly selected choice.
    /// </summary>
    [HttpGet("choice")]
    public async Task<ActionResult<RandomChoiceDto>> GetChoice()
    {
        var result = await _mediator.Send(new GetRandomChoiceQuery());
        return Ok(result);
    }
}
