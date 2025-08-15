namespace GameService.Interfaces;

public interface IRandomChoiceClient
{
    Task<string> GetRandomChoiceAsync(CancellationToken cancellationToken);
}
