import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { userService, type UserDto } from '@/services/userService';
import styles from './Community.module.css';

export function Community() {
  const { user, token, logout } = useAuth();
  const [members, setMembers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    userService
      .getAll(token)
      .then(setMembers)
      .catch(() => setError('Não foi possível carregar a comunidade.'))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <main className={styles.page}>
      <div className="container">
        {/* Cabeçalho */}
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.title}>Comunidade ConectaEla</h1>
            <p className={styles.subtitle}>
              Olá, <strong>{user?.name.split(' ')[0]}</strong>! Conheça outras mulheres da comunidade.
            </p>
          </div>
          <button className={styles.logoutBtn} onClick={logout}>
            Sair
          </button>
        </div>

        {/* Estados de loading / erro */}
        {loading && (
          <div className={styles.feedback}>
            <span className={styles.spinner} aria-label="Carregando..." />
            <p>Carregando membros...</p>
          </div>
        )}

        {!loading && error && (
          <div className={styles.errorBox}>{error}</div>
        )}

        {/* Grid de membros */}
        {!loading && !error && (
          <div className={styles.grid}>
            {members.length === 0 && (
              <p className={styles.empty}>Ainda não há outros membros. Convide alguém! 💜</p>
            )}
            {members.map((m) => (
              <article key={m.id} className={styles.card}>
                <div className={styles.avatar}>
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.info}>
                  <h3 className={styles.memberName}>{m.name}</h3>
                  {m.techArea && (
                    <span className={styles.badge}>{m.techArea}</span>
                  )}
                  {m.bio && <p className={styles.bio}>{m.bio}</p>}
                  <p className={styles.since}>
                    Membro desde{' '}
                    {new Date(m.createdAt).toLocaleDateString('pt-BR', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
