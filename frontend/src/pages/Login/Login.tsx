import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { useAuth, ApiError } from '@/contexts/AuthContext';
import styles from './Login.module.css';

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function Login() {
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.email) errs.email = 'E-mail é obrigatório.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Insira um e-mail válido.';
    if (!form.password) errs.password = 'Senha é obrigatória.';
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApiError(null);
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/comunidade');
    } catch (err) {
      if (err instanceof ApiError) {
        setApiError(err.message);
      } else {
        setApiError('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        {/* Cabeçalho visual */}
        <div className={styles.brandBar}>
          <span className={styles.brandIcon}>✦</span>
          <span className={styles.brandName}>ConectaEla</span>
        </div>

        <h1 className={styles.title}>Bem-vinda de volta!</h1>
        <p className={styles.subtitle}>
          Entre na sua conta e continue sua jornada.
        </p>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
            autoComplete="email"
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            autoComplete="current-password"
          />

          <div className={styles.forgotRow}>
            <Link to="/recuperar-senha" className={styles.forgotLink}>
              Esqueci minha senha
            </Link>
          </div>

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>

          {apiError && <p className={styles.apiError}>{apiError}</p>}
        </form>

        <p className={styles.registerPrompt}>
          Ainda não tem conta?{' '}
          <Link to="/cadastro">Cadastre-se gratuitamente</Link>
        </p>
      </div>
    </main>
  );
}
