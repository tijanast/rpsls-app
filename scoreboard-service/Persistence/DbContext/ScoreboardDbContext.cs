using Microsoft.EntityFrameworkCore;
using ScoreboardService.Entities;

namespace ScoreboardService.Persistence;

public class ScoreboardDbContext : DbContext
{
    public ScoreboardDbContext(DbContextOptions<ScoreboardDbContext> options) : base(options) { }
    public DbSet<ScoreRecord> ScoreRecords => Set<ScoreRecord>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ScoreRecord>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.PlayerName).HasMaxLength(100).IsRequired();
            e.Property(x => x.PlayerChoice).HasMaxLength(20).IsRequired();
            e.Property(x => x.ComputerChoice).HasMaxLength(20).IsRequired();
            e.Property(x => x.Result).HasMaxLength(10).IsRequired();
            e.Property(x => x.CreatedAt).IsRequired();
        });
    }
}