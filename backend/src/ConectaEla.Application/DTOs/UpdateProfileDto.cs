using System.ComponentModel.DataAnnotations;

namespace ConectaEla.Application.DTOs;

/// <summary>Dados para atualização do perfil da usuária.</summary>
public sealed record UpdateProfileDto(
    [Required(ErrorMessage = "Nome é obrigatório.")]
    [StringLength(100, MinimumLength = 2)]
    string Name,

    [StringLength(500, ErrorMessage = "Bio deve ter no máximo 500 caracteres.")]
    string? Bio,

    string? TechArea
);
