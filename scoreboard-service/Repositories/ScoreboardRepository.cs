using Microsoft.EntityFrameworkCore;
using Rpsls.Contracts;
using ScoreboardService.Interfaces;
using ScoreboardService.Entities;
using ScoreboardService.Persistence;

namespace ScoreboardService.Repositories;

public class ScoreboardRepository : IScoreboardRepository
{
    private readonly ScoreboardDbContext _db;

    public ScoreboardRepository(ScoreboardDbContext db) => _db = db;

    public async Task<Guid> CreateAsync(ScoreRecord entity, CancellationToken ct)
    {
        // TODO: Add try-catch
        _db.ScoreRecords.Add(entity);
        await _db.SaveChangesAsync(ct);
        return entity.Id;
    }

    public async Task<IReadOnlyList<ScoreRecordDto>> GetLatestAsync(int take, CancellationToken ct)
    {
        return await _db.ScoreRecords
            .AsNoTracking()
            .OrderByDescending(x => x.CreatedAt)
            .Take(take)
            .Select(x => new ScoreRecordDto(
                x.Id,
                x.PlayerName,
                x.PlayerChoice,
                x.ComputerChoice,
                x.Result,
                x.CreatedAt))
            .ToListAsync(ct);
    }
}
