using MediatR;
using Microsoft.EntityFrameworkCore;
using Rpsls.Contracts;
using ScoreboardService.Persistence;

namespace ScoreboardService.Application.Queries.GetScoreboard;
public class GetScoreboardHandler : IRequestHandler<GetScoreboardQuery, IReadOnlyList<ScoreRecordDto>>
{
    private readonly ScoreboardDbContext _db;
    public GetScoreboardHandler(ScoreboardDbContext db) => _db = db;

    public async Task<IReadOnlyList<ScoreRecordDto>> Handle(GetScoreboardQuery request, CancellationToken ct)
    {
        return await _db.ScoreRecords
            .OrderByDescending(x => x.CreatedAt)
            .Take(request.Take)
            .Select(x => new ScoreRecordDto(x.Id, x.PlayerName, x.PlayerChoice, x.ComputerChoice, x.Result, x.CreatedAt))
            .ToListAsync(ct);
    }
}
