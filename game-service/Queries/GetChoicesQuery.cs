using MediatR;

namespace GameService.Queries;

public record GetChoicesQuery() : IRequest<IReadOnlyList<string>>;
