using MediatR;

namespace ScoreboardService.Commands
{
    public record ResetScoreboardCommand() : IRequest<Unit>;
}
