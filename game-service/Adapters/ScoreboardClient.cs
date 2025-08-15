using System.Net.Http;
using System.Net.Http.Json;
using GameService.Interfaces;
using GameServices.Responses;
using Rpsls.Contracts;

namespace GameService.Adapters;

public class ScoreboardClient : IScoreboardClient
{
    private readonly HttpClient _client;

    public ScoreboardClient(HttpClient client)
    {
        _client = client;
    }

    public async Task<Guid> CreateScoreRecordAsync(CreateScoreRequest request, CancellationToken cancellationToken)
    {
        var response = await _client.PostAsJsonAsync("api/scoreboard", request, cancellationToken);
        response.EnsureSuccessStatusCode();

        var createScoreResponse = await response.Content.ReadFromJsonAsync<CreateScoreResponse>(cancellationToken: cancellationToken);
        return createScoreResponse?.Id ?? Guid.Empty;
    }
}
