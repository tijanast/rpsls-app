namespace GameServices.Responses;

public record PlayGameResult(string PlayerName, string PlayerChoice, string ComputerChoice, string Result);
