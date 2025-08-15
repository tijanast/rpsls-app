using Rpsls.Contracts;

namespace GameService.Clients;

public interface IScoreboardClient
{
    Task<Guid> CreateScoreRecordAsync(CreateScoreRequest request, CancellationToken cancellationToken);
}
