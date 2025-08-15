namespace GameService.Clients;

public interface IRandomChoiceClient
{
    Task<string> GetRandomChoiceAsync(CancellationToken cancellationToken);
}
