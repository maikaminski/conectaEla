using System.ComponentModel.DataAnnotations;

namespace ConectaEla.Application.DTOs;

/// <summary>Dados necessários para cadastro de uma nova usuária.</summary>
public sealed record RegisterUserDto(
    [Required(ErrorMessage = "Nome é obrigatório.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Nome deve ter entre 2 e 100 caracteres.")]
    string Name,

    [Required(ErrorMessage = "E-mail é obrigatório.")]
    [EmailAddress(ErrorMessage = "E-mail inválido.")]
    string Email,

    [Required(ErrorMessage = "Senha é obrigatória.")]
    [MinLength(8, ErrorMessage = "A senha deve ter ao menos 8 caracteres.")]
    string Password,

    string? TechArea
);
