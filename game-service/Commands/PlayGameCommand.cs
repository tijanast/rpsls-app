using GameServices.Responses;
using MediatR;

namespace GameService.Commands;

public record PlayGameCommand(string PlayerName, string PlayerChoice) : IRequest<PlayGameResult>;
