using MediatR;
using ScoreboardService.Commands;
using ScoreboardService.Interfaces;
using ScoreboardService.Entities;

namespace ScoreboardService.Handlers;

public class CreateScoreRecordHandler : IRequestHandler<CreateScoreRecordCommand, Guid>
{
    private readonly IScoreboardRepository _repo;

    public CreateScoreRecordHandler(IScoreboardRepository repo) => _repo = repo;

    public async Task<Guid> Handle(CreateScoreRecordCommand request, CancellationToken ct)
    {
        var entity = new ScoreRecord
        {
            Id = Guid.NewGuid(),
            PlayerName = request.playerName,
            PlayerChoice = request.playerChoice,
            ComputerChoice = request.computerChoice,
            Result = request.result,
            CreatedAt = DateTime.UtcNow
        };

        return await _repo.CreateAsync(entity, ct);
    }
}
