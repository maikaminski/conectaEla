namespace ConectaEla.Application.DTOs;

/// <summary>Dados retornados ao cliente sobre uma usuária.</summary>
public sealed record UserDto(
    Guid Id,
    string Name,
    string Email,
    string? TechArea,
    string? Bio,
    DateTime CreatedAt
);
