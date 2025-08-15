using GameService.Queries;
using MediatR;

namespace GameService.Handlers;

public class GetChoicesHandler : IRequestHandler<GetChoicesQuery, IReadOnlyList<string>>
{
    public Task<IReadOnlyList<string>> Handle(GetChoicesQuery request, CancellationToken cancellationToken)
    {
        // TODO: move to a constants file
        var choices = new[] { "Rock", "Paper", "Scissors", "Lizard", "Spock" };
        return Task.FromResult<IReadOnlyList<string>>(choices);
    }
}
