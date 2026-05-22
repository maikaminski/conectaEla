# ✦ ConectaEla

> Plataforma de conexão e suporte para mulheres em transição de carreira para a área de tecnologia.

---

## Estrutura do Projeto

```
ConectaEla/
├── frontend/          # React + TypeScript (Vite)
└── backend/           # ASP.NET Core 8 – Arquitetura DDD
    └── src/
        ├── ConectaEla.Domain/          # Entidades, Value Objects, Interfaces
        ├── ConectaEla.Application/     # Use Cases, DTOs, Serviços
        ├── ConectaEla.Infrastructure/  # EF Core, Repositórios, Segurança
        └── ConectaEla.API/             # Controllers, Middleware, Program.cs
```

---

## Frontend

### Tecnologias
- **React 18** + **TypeScript**
- **Vite** (bundler)
- **React Router v6** (roteamento)
- **CSS Modules** (estilização escopada)

### Design System
| Token | Light | Dark |
|---|---|---|
| Primary | `#9B59B6` | `#C084FC` |
| Background | `#FFFFFF` | `#0F0F1A` |
| Surface | `#F5EEFF` | `#1A1A2E` |
| Card | `#FFFFFF` | `#252538` |

A troca de tema (light ↔ dark) é persistida no `localStorage` e aplicada via atributo `data-theme` no `<html>`.

### Como rodar

```bash
cd frontend
npm install
npm run dev
# Acesse: http://localhost:3000
```

### Páginas disponíveis
| Rota | Descrição |
|---|---|
| `/` | Página inicial (Hero + Features + CTA) |
| `/login` | Formulário de login |
| `/cadastro` | Formulário de cadastro |

---

## Backend

### Tecnologias
- **ASP.NET Core 8** (Web API)
- **Entity Framework Core 8** com **SQLite** (desenvolvimento)
- **Swashbuckle / Swagger** (documentação automática)
- **PBKDF2** via `Microsoft.AspNetCore.Cryptography.KeyDerivation` (hashing de senha)

### Arquitetura DDD
```
Domain         → Regras de negócio puras (sem dependências externas)
Application    → Orquestra casos de uso, DTOs, interfaces de serviço
Infrastructure → Implementações concretas (EF Core, PasswordHasher)
API            → Entrada HTTP, controllers, middleware de exceções
```

### Como rodar

```bash
cd backend
dotnet restore
dotnet run --project src/ConectaEla.API
# API:    http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

### Endpoints disponíveis
| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/users` | Lista usuárias ativas |
| `GET` | `/api/users/{id}` | Busca usuária por ID |
| `POST` | `/api/users/register` | Cadastra nova usuária |
| `PUT` | `/api/users/{id}/profile` | Atualiza perfil |

---

## Próximos Passos

- [ ] Autenticação JWT
- [ ] Página de perfil da usuária
- [ ] Feed da comunidade (posts e recursos)
- [ ] Formulário de mapeamento de dificuldades
- [ ] Migração para PostgreSQL em produção
- [ ] Testes unitários (xUnit + Vitest)
- [ ] CI/CD (GitHub Actions)

---

## Licença

MIT © ConectaEla
