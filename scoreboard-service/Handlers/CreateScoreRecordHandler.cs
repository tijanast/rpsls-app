using MediatR;
using ScoreboardService.Entities;
using ScoreboardService.Persistence;

namespace ScoreboardService.Application.Commands.CreateScoreRecord;
public class CreateScoreRecordHandler : IRequestHandler<CreateScoreRecordCommand, Guid>
{
    private readonly ScoreboardDbContext _db;
    public CreateScoreRecordHandler(ScoreboardDbContext db) => _db = db;

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
        _db.ScoreRecords.Add(entity);
        await _db.SaveChangesAsync(ct);
        return entity.Id;
    }
}
