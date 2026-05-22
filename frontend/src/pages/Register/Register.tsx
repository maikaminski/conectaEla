import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { authService } from '@/services/userService';
import { ApiError } from '@/services/api';
import styles from './Register.module.css';

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  techArea: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const techAreas = [
  'Desenvolvimento Front-end',
  'Desenvolvimento Back-end',
  'Desenvolvimento Full-stack',
  'Dados e Inteligência Artificial',
  'UX/UI Design',
  'Segurança da Informação',
  'DevOps / Cloud',
  'Gestão de Produto (Product Management)',
  'Outro',
];

export function Register() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    techArea: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Nome é obrigatório.';
    if (!form.email) errs.email = 'E-mail é obrigatório.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Insira um e-mail válido.';
    if (!form.password) errs.password = 'Senha é obrigatória.';
    else if (form.password.length < 8)
      errs.password = 'A senha deve ter ao menos 8 caracteres.';
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = 'As senhas não coincidem.';
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
      await authService.register({
        name: form.name,
        email: form.email,
        password: form.password,
        techArea: form.techArea || undefined,
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2500);
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

  if (success) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <span className={styles.successIcon}>🎉</span>
          <h1 className={styles.title}>Cadastro realizado!</h1>
          <p className={styles.subtitle}>
            Bem-vinda, {form.name.split(' ')[0]}! Sua conta foi criada com sucesso.
            Acesse a plataforma e comece a sua jornada.
          </p>
          <Link to="/login">
            <Button fullWidth>Entrar agora</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brandBar}>
          <span className={styles.brandIcon}>✦</span>
          <span className={styles.brandName}>ConectaEla</span>
        </div>

        <h1 className={styles.title}>Crie sua conta</h1>
        <p className={styles.subtitle}>
          Gratuita, rápida e feita para você.
        </p>

        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          <Input
            label="Nome completo"
            type="text"
            placeholder="Maria da Silva"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            autoComplete="name"
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
            autoComplete="email"
          />

          <div className={styles.fieldGroup}>
            <label htmlFor="tech-area" className={styles.selectLabel}>
              Área de interesse em tech
            </label>
            <select
              id="tech-area"
              className={styles.select}
              value={form.techArea}
              onChange={(e) => setForm({ ...form, techArea: e.target.value })}
            >
              <option value="">Selecione uma área...</option>
              {techAreas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <Input
            label="Senha"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            hint="Use letras, números e símbolos para uma senha mais forte."
            autoComplete="new-password"
          />
          <Input
            label="Confirmar senha"
            type="password"
            placeholder="Repita a senha"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta grátis'}
          </Button>

          {apiError && <p className={styles.apiError}>{apiError}</p>}
        </form>

        <p className={styles.loginPrompt}>
          Já tem uma conta?{' '}
          <Link to="/login">Entrar</Link>
        </p>
      </div>
    </main>
  );
}
