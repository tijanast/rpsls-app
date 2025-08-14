namespace Rpsls.Contracts;

/// <summary>
/// Request to create a scoreboard entry.
/// </summary>
/// <param name="PlayerName">Player's name.</param>
/// <param name="PlayerChoice">Player's choice.</param>
/// <param name="ComputerChoice">Computer's choice.</param>
/// <param name="Result">Round result (Win/Lose/Draw).</param>
public record CreateScoreRequest(
    string PlayerName,
    string PlayerChoice,
    string ComputerChoice,
    string Result
);
