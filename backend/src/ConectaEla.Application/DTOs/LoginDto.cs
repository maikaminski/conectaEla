using System.ComponentModel.DataAnnotations;

namespace ConectaEla.Application.DTOs;

/// <summary>Dados necessários para autenticação.</summary>
public sealed record LoginDto(
    [Required(ErrorMessage = "E-mail é obrigatório.")]
    [EmailAddress(ErrorMessage = "E-mail inválido.")]
    string Email,

    [Required(ErrorMessage = "Senha é obrigatória.")]
    string Password
);
