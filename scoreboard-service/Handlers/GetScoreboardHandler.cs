using MediatR;
using Rpsls.Contracts;
using ScoreboardService.Interfaces;
using ScoreboardService.Queries;

public class GetScoreboardHandler : IRequestHandler<GetScoreboardQuery, IReadOnlyList<ScoreRecordDto>>
{
    private readonly IScoreboardRepository _repo;

    public GetScoreboardHandler(IScoreboardRepository repo) => _repo = repo;

    public async Task<IReadOnlyList<ScoreRecordDto>> Handle(GetScoreboardQuery request, CancellationToken ct)
    {
        return await _repo.GetLatestAsync(request.Take, ct);
    }
}
