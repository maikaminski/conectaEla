import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import styles from './Home.module.css';

const features = [
  {
    icon: '🤝',
    title: 'Networking Genuíno',
    description:
      'Conecte-se com mulheres que estão na mesma jornada e com profissionais de tecnologia dispostas a ajudar.',
  },
  {
    icon: '📚',
    title: 'Recursos Compartilhados',
    description:
      'Acesse e compartilhe materiais de estudo, artigos, dicas e oportunidades de emprego curados pela comunidade.',
  },
  {
    icon: '💬',
    title: 'Suporte Mútuo',
    description:
      'Um espaço seguro para tirar dúvidas, celebrar conquistas e encontrar encorajamento durante a transição.',
  },
  {
    icon: '🚀',
    title: 'Trilhas de Aprendizado',
    description:
      'Descubra caminhos dentro da tecnologia que combinam com o seu perfil, interesses e objetivos profissionais.',
  },
];

export function Home() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.badge}>✦ Comunidade para mulheres em tech</span>
          <h1 className={styles.heroTitle}>
            Sua jornada para a
            <span className={styles.highlight}> tecnologia</span>{' '}
            começa aqui
          </h1>
          <p className={styles.heroSubtitle}>
            O ConectaEla é uma plataforma de conexão, suporte e troca de experiências
            para mulheres que estão dando os primeiros — ou próximos — passos em direção
            a uma carreira na área de tecnologia.
          </p>
          <div className={styles.heroActions}>
            <Link to="/cadastro">
              <Button size="lg">Fazer parte da comunidade</Button>
            </Link>
            <Link to="/sobre">
              <Button variant="secondary" size="lg">Saiba mais</Button>
            </Link>
          </div>
        </div>
        <div className={styles.heroDecoration} aria-hidden="true">
          <div className={styles.circle1} />
          <div className={styles.circle2} />
          <div className={styles.circle3} />
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>O que você encontra aqui</h2>
          <p className={styles.sectionSubtitle}>
            Tudo o que você precisa para navegar a transição de carreira com mais
            confiança, clareza e comunidade.
          </p>
          <div className={styles.featureGrid}>
            {features.map((f) => (
              <article key={f.title} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDescription}>{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Pronta para começar?</h2>
          <p className={styles.ctaText}>
            Crie seu perfil gratuitamente e conecte-se com centenas de mulheres que,
            assim como você, estão construindo um novo futuro em tecnologia.
          </p>
          <Link to="/cadastro">
            <Button size="lg">Criar minha conta grátis</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
