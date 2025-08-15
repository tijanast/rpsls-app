using System.Net.Http;
using System.Net.Http.Json;
using GameService.Clients;
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

        var id = await response.Content.ReadFromJsonAsync<Guid>(cancellationToken: cancellationToken);
        return id;
    }
}
