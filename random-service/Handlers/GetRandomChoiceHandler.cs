using MediatR;
using Rpsls.Contracts;

namespace RandomService.Application.Queries;

public class GetRandomChoiceHandler : IRequestHandler<GetRandomChoiceQuery, RandomChoiceDto>
{
    private readonly Random _rng = new();

    public Task<RandomChoiceDto> Handle(GetRandomChoiceQuery request, CancellationToken ct)
    {
        var choice = GameChoices.All[_rng.Next(GameChoices.All.Length)];
        return Task.FromResult(new RandomChoiceDto(choice));
    }
}
