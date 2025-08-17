using MediatR;
using ScoreboardService.Interfaces;

namespace ScoreboardService.Commands
{
    public class ResetScoreboardCommandHandler : IRequestHandler<ResetScoreboardCommand, Unit>
    {
        private readonly IScoreboardRepository _repo;

        public ResetScoreboardCommandHandler(IScoreboardRepository repo) => _repo = repo;

        public async Task<Unit> Handle(ResetScoreboardCommand request, CancellationToken cancellationToken)
        {
            await _repo.ResetAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
