using Rpsls.Contracts;
using ScoreboardService.Entities;

namespace ScoreboardService.Interfaces;

public interface IScoreboardRepository
{
    Task<Guid> CreateAsync(ScoreRecord entity, CancellationToken ct);
    Task<IReadOnlyList<ScoreRecordDto>> GetLatestAsync(int take, CancellationToken ct);
}
