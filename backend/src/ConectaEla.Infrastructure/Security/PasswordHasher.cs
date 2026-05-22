using ConectaEla.Application.Interfaces;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace ConectaEla.Infrastructure.Security;

/// <summary>
/// Implementação de hashing de senha usando PBKDF2 com salt aleatório.
/// </summary>
public sealed class PasswordHasher : IPasswordHasher
{
    private const int SaltSize    = 16;
    private const int HashSize    = 32;
    private const int Iterations  = 100_000;
    private const char Separator  = ':';

    public string Hash(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(SaltSize);
        var hash = Derive(password, salt);
        return $"{Convert.ToBase64String(salt)}{Separator}{Convert.ToBase64String(hash)}";
    }

    public bool Verify(string password, string hashedPassword)
    {
        var parts = hashedPassword.Split(Separator);
        if (parts.Length != 2) return false;

        var salt = Convert.FromBase64String(parts[0]);
        var storedHash = Convert.FromBase64String(parts[1]);
        var computedHash = Derive(password, salt);

        return CryptographicOperations.FixedTimeEquals(computedHash, storedHash);
    }

    private static byte[] Derive(string password, byte[] salt) =>
        KeyDerivation.Pbkdf2(
            password,
            salt,
            KeyDerivationPrf.HMACSHA256,
            Iterations,
            HashSize);
}
