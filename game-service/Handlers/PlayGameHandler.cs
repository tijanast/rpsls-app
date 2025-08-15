using System.Net.Http.Json;
using GameService.Interfaces;
using GameService.Commands;
using GameService.Services;
using GameServices.Responses;
using MediatR;
using Rpsls.Contracts;

namespace GameService.Handlers;

public class PlayGameHandler : IRequestHandler<PlayGameCommand, PlayGameResult>
{
    private readonly IRandomChoiceClient _randomClient;
    private readonly IScoreboardClient _scoreboardClient;

    public PlayGameHandler(IRandomChoiceClient randomClient, IScoreboardClient scoreboardClient)
    {
        _randomClient = randomClient;
        _scoreboardClient = scoreboardClient;
    }

    public async Task<PlayGameResult> Handle(PlayGameCommand request, CancellationToken cancellationToken)
    {
        var computerChoice = await _randomClient.GetRandomChoiceAsync(cancellationToken);

        var result = GameRules.Decide(request.PlayerChoice, computerChoice);

        var createScoreRequest = new CreateScoreRequest(request.PlayerName, request.PlayerChoice, computerChoice, result);
        await _scoreboardClient.CreateScoreRecordAsync(createScoreRequest, cancellationToken);

        return new PlayGameResult(request.PlayerName, request.PlayerChoice, computerChoice, result);
    }
}
