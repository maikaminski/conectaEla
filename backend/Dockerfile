# Etapa 1: build
FROM --platform=linux/amd64 mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY ConectaEla.sln .
COPY src/ConectaEla.Domain/ConectaEla.Domain.csproj           src/ConectaEla.Domain/
COPY src/ConectaEla.Application/ConectaEla.Application.csproj src/ConectaEla.Application/
COPY src/ConectaEla.Infrastructure/ConectaEla.Infrastructure.csproj src/ConectaEla.Infrastructure/
COPY src/ConectaEla.API/ConectaEla.API.csproj                 src/ConectaEla.API/

RUN dotnet restore

COPY src/ src/
RUN dotnet publish src/ConectaEla.API/ConectaEla.API.csproj -c Release -o /publish

# Etapa 2: imagem final
FROM --platform=linux/amd64 mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Diretório para o banco SQLite persistente
RUN mkdir -p /app/data

COPY --from=build /publish .

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 8080

ENTRYPOINT ["dotnet", "ConectaEla.API.dll"]
