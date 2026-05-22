using ConectaEla.Domain.Entities;

namespace ConectaEla.Application.Interfaces;

/// <summary>
/// Serviço responsável por gerar tokens JWT.
/// </summary>
public interface ITokenService
{
    string GenerateToken(User user);
}
