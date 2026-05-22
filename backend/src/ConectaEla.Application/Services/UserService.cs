using ConectaEla.Application.DTOs;
using ConectaEla.Application.Interfaces;
using ConectaEla.Domain.Entities;
using ConectaEla.Domain.Interfaces;

namespace ConectaEla.Application.Services;

public sealed class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;

    public UserService(IUserRepository userRepository, IPasswordHasher passwordHasher)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<UserDto> RegisterAsync(RegisterUserDto dto, CancellationToken ct = default)
    {
        var emailNormalized = dto.Email.Trim().ToLowerInvariant();

        if (await _userRepository.ExistsByEmailAsync(emailNormalized, ct))
            throw new InvalidOperationException("Já existe uma conta com este e-mail.");

        var passwordHash = _passwordHasher.Hash(dto.Password);
        var user = User.Create(dto.Name, emailNormalized, passwordHash, dto.TechArea);

        await _userRepository.AddAsync(user, ct);

        return MapToDto(user);
    }

    public async Task<UserDto?> GetByIdAsync(Guid id, CancellationToken ct = default)
    {
        var user = await _userRepository.GetByIdAsync(id, ct);
        return user is null ? null : MapToDto(user);
    }

    public async Task<IReadOnlyList<UserDto>> GetAllActiveAsync(CancellationToken ct = default)
    {
        var users = await _userRepository.GetAllActiveAsync(ct);
        return users.Select(MapToDto).ToList().AsReadOnly();
    }

    public async Task<UserDto> UpdateProfileAsync(Guid id, UpdateProfileDto dto, CancellationToken ct = default)
    {
        var user = await _userRepository.GetByIdAsync(id, ct)
            ?? throw new KeyNotFoundException($"Usuária {id} não encontrada.");

        user.UpdateProfile(dto.Name, dto.Bio, dto.TechArea);
        await _userRepository.UpdateAsync(user, ct);

        return MapToDto(user);
    }

    private static UserDto MapToDto(User user) => new(
        user.Id,
        user.Name,
        user.Email,
        user.TechArea,
        user.Bio,
        user.CreatedAt
    );
}
