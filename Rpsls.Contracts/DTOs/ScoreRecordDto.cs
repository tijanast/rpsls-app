namespace Rpsls.Contracts;

/// <summary>
/// A scoreboard entry with player, computer choice, result, and timestamp.
/// </summary>
public record ScoreRecordDto(
    Guid Id,
    string PlayerName,
    string PlayerChoice,
    string ComputerChoice,
    string Result,
    DateTime CreatedAt
);