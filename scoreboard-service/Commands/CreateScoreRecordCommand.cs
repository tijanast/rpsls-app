using MediatR;

namespace ScoreboardService.Commands;
public record CreateScoreRecordCommand(
    string playerName,
    string playerChoice,
    string computerChoice,
    string result
) : IRequest<Guid>;
