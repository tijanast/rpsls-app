namespace Rpsls.Contracts;

/// <summary>
/// Represents the data required to play a game round.
/// </summary>
/// <param name="PlayerName">Name of the player.</param>
/// <param name="PlayerChoice">The choice made by the player.</param>
public record PlayRequest(string PlayerName, string PlayerChoice);
