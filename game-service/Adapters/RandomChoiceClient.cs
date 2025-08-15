using GameService.Interfaces;
using Rpsls.Contracts;

namespace GameService.Adapters;

public class RandomChoiceClient : IRandomChoiceClient
{
    private readonly HttpClient _httpClient;

    public RandomChoiceClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetRandomChoiceAsync(CancellationToken cancellationToken)
    {
        var randomDto = await _httpClient.GetFromJsonAsync<RandomChoiceDto>("api/random/choice", cancellationToken);
        return randomDto?.Choice ?? "Rock";
    }
}
