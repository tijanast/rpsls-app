namespace GameService.Services;

public static class GameRules
{
    /// <summary>
    /// Determines the outcome of a Rock-Paper-Scissors-Lizard-Spock round.
    /// </summary>
    /// <param name="player">Player's choice: Rock, Paper, Scissors, Lizard, or Spock.</param>
    /// <param name="computer">Computer's choice: Rock, Paper, Scissors, Lizard, or Spock.</param>
    /// <returns>"Win", "Lose", or "Draw" based on the game rules.</returns>
    public static string Decide(string player, string computer)
    {
        if (player == computer) return "Draw";
        // Who beats who
        var beats = new Dictionary<string, string[]>
        {
            ["Rock"] = new[] { "Scissors", "Lizard" },
            ["Paper"] = new[] { "Rock", "Spock" },
            ["Scissors"] = new[] { "Paper", "Lizard" },
            ["Lizard"] = new[] { "Spock", "Paper" },
            ["Spock"] = new[] { "Scissors", "Rock" }
        };
        return beats[player].Contains(computer) ? "Win" : "Lose";
    }
}
