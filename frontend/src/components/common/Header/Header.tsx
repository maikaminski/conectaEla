import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/Button/Button';
import styles from './Header.module.css';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="ConectaEla – Página inicial">
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>ConectaEla</span>
        </Link>

        {/* Navegação */}
        <nav className={styles.nav} aria-label="Navegação principal">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
            }
          >
            Início
          </NavLink>
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
            }
          >
            Sobre
          </NavLink>
          <NavLink
            to="/comunidade"
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ''].join(' ')
            }
          >
            Comunidade
          </NavLink>
        </nav>

        {/* Ações */}
        <div className={styles.actions}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={
              theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'
            }
            title={theme === 'light' ? 'Tema Escuro' : 'Tema Claro'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {isAuthenticated ? (
            <>
              <span className={styles.userGreeting}>
                Olá, {user?.name.split(' ')[0]}
              </span>
              <Button variant="secondary" size="sm" onClick={logout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" size="sm">Entrar</Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="primary" size="sm">Cadastrar</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
