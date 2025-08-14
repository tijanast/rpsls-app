namespace ScoreboardService.Entities;

public class ScoreRecord
{
    public Guid Id { get; set; }
    public string PlayerName { get; set; } = default!;
    public string PlayerChoice { get; set; } = default!;
    public string ComputerChoice { get; set; } = default!;
    public string Result { get; set; } = default!; // "Win", "Lose", "Draw"
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}