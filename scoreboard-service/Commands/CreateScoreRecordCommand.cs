using MediatR;

namespace ScoreboardService.Application.Commands.CreateScoreRecord;
public record CreateScoreRecordCommand(
    string playerName,
    string playerChoice,
    string computerChoice,
    string result
) : IRequest<Guid>;
