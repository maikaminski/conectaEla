using ConectaEla.Domain.Entities;
using ConectaEla.Domain.Interfaces;
using ConectaEla.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ConectaEla.Infrastructure.Repositories;

public sealed class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await _context.Users.FirstOrDefaultAsync(u => u.Id == id && u.IsActive, ct);

    public async Task<User?> GetByEmailAsync(string email, CancellationToken ct = default) =>
        await _context.Users.FirstOrDefaultAsync(
            u => u.Email == email.ToLowerInvariant() && u.IsActive, ct);

    public async Task<IReadOnlyList<User>> GetAllActiveAsync(CancellationToken ct = default) =>
        await _context.Users
            .Where(u => u.IsActive)
            .OrderByDescending(u => u.CreatedAt)
            .ToListAsync(ct);

    public async Task AddAsync(User user, CancellationToken ct = default)
    {
        await _context.Users.AddAsync(user, ct);
        await _context.SaveChangesAsync(ct);
    }

    public async Task UpdateAsync(User user, CancellationToken ct = default)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync(ct);
    }

    public async Task<bool> ExistsByEmailAsync(string email, CancellationToken ct = default) =>
        await _context.Users.AnyAsync(
            u => u.Email == email.ToLowerInvariant(), ct);
}
