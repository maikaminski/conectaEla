import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home/Home';
import { Login } from '@/pages/Login/Login';
import { Register } from '@/pages/Register/Register';
import { Community } from '@/pages/Community/Community';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route
        path="/comunidade"
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 5rem)',
        gap: '1rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <span style={{ fontSize: '4rem' }}>🔮</span>
      <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>
        Página não encontrada
      </h1>
      <p style={{ color: 'var(--text-secondary)' }}>
        A página que você procura não existe ou foi movida.
      </p>
      <a href="/" style={{ color: 'var(--color-primary)' }}>
        Voltar ao início
      </a>
    </main>
  );
}
