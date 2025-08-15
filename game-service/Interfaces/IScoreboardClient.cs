using Rpsls.Contracts;

namespace GameService.Interfaces;

public interface IScoreboardClient
{
    Task<Guid> CreateScoreRecordAsync(CreateScoreRequest request, CancellationToken cancellationToken);
}
