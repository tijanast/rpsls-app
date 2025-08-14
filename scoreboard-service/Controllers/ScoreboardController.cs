using MediatR;
using Microsoft.AspNetCore.Mvc;
using Rpsls.Contracts;
using ScoreboardService.Application.Commands.CreateScoreRecord;
using ScoreboardService.Application.Queries.GetScoreboard;

namespace ScoreboardService.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ScoreboardController : ControllerBase
{
    private readonly IMediator _mediator;
    public ScoreboardController(IMediator mediator) => _mediator = mediator;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateScoreRequest request)
    {
        // TODO: add try catch for error handling
        var id = await _mediator.Send(new CreateScoreRecordCommand(
            request.PlayerName, request.PlayerChoice, request.ComputerChoice, request.Result));
        return CreatedAtAction(nameof(Get), new { id }, new { id });
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ScoreRecordDto>>> Get([FromQuery] int take = 50)
    {
        var result = await _mediator.Send(new GetScoreboardQuery(take));
        return Ok(result);
    }
}
