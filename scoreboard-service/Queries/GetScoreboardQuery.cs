using MediatR;
using Rpsls.Contracts;

namespace ScoreboardService.Application.Queries.GetScoreboard;
public record GetScoreboardQuery(int Take = 50) : IRequest<IReadOnlyList<ScoreRecordDto>>;
