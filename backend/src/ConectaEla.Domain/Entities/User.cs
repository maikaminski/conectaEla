namespace ConectaEla.Domain.Entities;

/// <summary>
/// Entidade raiz que representa uma usuária da plataforma.
/// </summary>
public sealed class User
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }
    public string? TechArea { get; private set; }
    public string? Bio { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }
    public bool IsActive { get; private set; }

    // Construtor privado para uso de ORM / reconstituição
    private User() 
    {
        Name = string.Empty;
        Email = string.Empty;
        PasswordHash = string.Empty;
    }

    private User(
        Guid id,
        string name,
        string email,
        string passwordHash,
        string? techArea)
    {
        Id = id;
        Name = name;
        Email = email;
        PasswordHash = passwordHash;
        TechArea = techArea;
        CreatedAt = DateTime.UtcNow;
        IsActive = true;
    }

    /// <summary>Factory que garante as regras de criação da entidade.</summary>
    public static User Create(string name, string email, string passwordHash, string? techArea = null)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(email);
        ArgumentException.ThrowIfNullOrWhiteSpace(passwordHash);

        return new User(Guid.NewGuid(), name.Trim(), email.Trim().ToLowerInvariant(), passwordHash, techArea);
    }

    public void UpdateProfile(string name, string? bio, string? techArea)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);

        Name = name.Trim();
        Bio = bio?.Trim();
        TechArea = techArea;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Deactivate() => IsActive = false;
}
