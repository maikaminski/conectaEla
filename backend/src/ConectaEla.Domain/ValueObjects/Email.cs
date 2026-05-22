namespace ConectaEla.Domain.ValueObjects;

/// <summary>
/// Value Object que representa um endereço de e-mail validado.
/// </summary>
public sealed class Email : IEquatable<Email>
{
    public string Value { get; }

    public Email(string value)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(value);

        var normalized = value.Trim().ToLowerInvariant();

        if (!IsValid(normalized))
            throw new ArgumentException($"'{value}' não é um e-mail válido.", nameof(value));

        Value = normalized;
    }

    public static bool IsValid(string email) =>
        !string.IsNullOrWhiteSpace(email) &&
        email.Contains('@') &&
        email.IndexOf('@') > 0 &&
        email.IndexOf('.', email.IndexOf('@')) > email.IndexOf('@') + 1;

    public bool Equals(Email? other) =>
        other is not null &&
        string.Equals(Value, other.Value, StringComparison.OrdinalIgnoreCase);

    public override bool Equals(object? obj) => Equals(obj as Email);

    public override int GetHashCode() =>
        StringComparer.OrdinalIgnoreCase.GetHashCode(Value);

    public override string ToString() => Value;
}
