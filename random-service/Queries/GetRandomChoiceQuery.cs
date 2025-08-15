using MediatR;
using Rpsls.Contracts;

namespace RandomService.Application.Queries;

public record GetRandomChoiceQuery() : IRequest<RandomChoiceDto>;
