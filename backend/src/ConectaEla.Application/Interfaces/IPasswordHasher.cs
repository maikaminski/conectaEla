namespace ConectaEla.Application.Interfaces;

/// <summary>
/// Abstração para hashing e verificação de senhas.
/// Implementada na camada de Infraestrutura.
/// </summary>
public interface IPasswordHasher
{
    string Hash(string password);
    bool Verify(string password, string hash);
}
