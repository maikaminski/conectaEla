using ConectaEla.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConectaEla.Infrastructure.Data;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>(u =>
        {
            u.HasKey(x => x.Id);

            u.Property(x => x.Name)
             .IsRequired()
             .HasMaxLength(100);

            u.Property(x => x.Email)
             .IsRequired()
             .HasMaxLength(200);

            u.HasIndex(x => x.Email)
             .IsUnique();

            u.Property(x => x.PasswordHash)
             .IsRequired();

            u.Property(x => x.TechArea)
             .HasMaxLength(100);

            u.Property(x => x.Bio)
             .HasMaxLength(500);

            u.Property(x => x.CreatedAt)
             .IsRequired();
        });
    }
}
