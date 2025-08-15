using MediatR;
using Rpsls.Contracts;

namespace ScoreboardService.Queries;
public record GetScoreboardQuery(int Take = 50) : IRequest<IReadOnlyList<ScoreRecordDto>>;
