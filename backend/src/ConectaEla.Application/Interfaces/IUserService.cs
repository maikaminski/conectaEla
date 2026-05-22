using ConectaEla.Application.DTOs;

namespace ConectaEla.Application.Interfaces;

/// <summary>
/// Serviço de aplicação responsável pelas operações relacionadas à usuária.
/// </summary>
public interface IUserService
{
    Task<UserDto> RegisterAsync(RegisterUserDto dto, CancellationToken ct = default);
    Task<UserDto?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IReadOnlyList<UserDto>> GetAllActiveAsync(CancellationToken ct = default);
    Task<UserDto> UpdateProfileAsync(Guid id, UpdateProfileDto dto, CancellationToken ct = default);
}
