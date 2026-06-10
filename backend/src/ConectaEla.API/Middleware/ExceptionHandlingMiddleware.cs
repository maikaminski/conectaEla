using System.Net;
using System.Text.Json;

namespace ConectaEla.API.Middleware;

/// <summary>
/// Middleware centralizado para tratamento de exceções não previstas.
/// Retorna respostas padronizadas em JSON.
/// </summary>
public sealed class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exceção não tratada em {Path}", context.Request.Path);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var (statusCode, message) = exception switch
        {
            UnauthorizedAccessException => (HttpStatusCode.Unauthorized, exception.Message),
            KeyNotFoundException        => (HttpStatusCode.NotFound, exception.Message),
            InvalidOperationException e when !e.Message.Contains("transient") && !e.Message.Contains("Npgsql") && !e.Message.Contains("database")
                                        => (HttpStatusCode.Conflict, exception.Message),
            ArgumentException           => (HttpStatusCode.BadRequest, exception.Message),
            _                           => (HttpStatusCode.InternalServerError, "Ocorreu um erro interno. Tente novamente mais tarde.")
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode  = (int)statusCode;

        var body = JsonSerializer.Serialize(new { message });
        await context.Response.WriteAsync(body);
    }
}
