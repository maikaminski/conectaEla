namespace ConectaEla.Application.DTOs;

/// <summary>Resposta retornada após login bem-sucedido.</summary>
public sealed record AuthResponseDto(
    string Token,
    UserDto User
);
