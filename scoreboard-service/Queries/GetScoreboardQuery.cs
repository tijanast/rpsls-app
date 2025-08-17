using MediatR;
using Rpsls.Contracts;

namespace ScoreboardService.Queries;
public record GetScoreboardQuery(int Take = 10) : IRequest<IReadOnlyList<ScoreRecordDto>>;
