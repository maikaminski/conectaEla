using ConectaEla.Application.DTOs;

namespace ConectaEla.Application.Interfaces;

/// <summary>
/// Serviço de autenticação: valida credenciais e emite token.
/// </summary>
public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginDto dto, CancellationToken ct = default);
}
