using ConectaEla.Application.DTOs;
using ConectaEla.Application.Interfaces;
using ConectaEla.Domain.Interfaces;

namespace ConectaEla.Application.Services;

public sealed class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;
    private readonly ITokenService _tokenService;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher passwordHasher,
        ITokenService tokenService)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _tokenService   = tokenService;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto, CancellationToken ct = default)
    {
        var user = await _userRepository.GetByEmailAsync(dto.Email.Trim().ToLowerInvariant(), ct)
            ?? throw new UnauthorizedAccessException("E-mail ou senha inválidos.");

        if (!_passwordHasher.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("E-mail ou senha inválidos.");

        var token = _tokenService.GenerateToken(user);

        var userDto = new UserDto(
            user.Id,
            user.Name,
            user.Email,
            user.TechArea,
            user.Bio,
            user.CreatedAt
        );

        return new AuthResponseDto(token, userDto);
    }
}
