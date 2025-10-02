import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <main className={styles.home}>
            {/* Hero principal */}
            <section className={styles.hero}>
                <h1 className={styles.title}>Bienvenido a La DesEsperanza</h1>
                <p className={styles.subtitle}>Pan artesanal, fresco y hecho con amor.</p>
                <button className={styles.cta}>Ver Productos</button>
            </section>

            {/* Sección de destacados */}
            <section className={styles.featured}>
                <h2 className={styles.sectionTitle}>Nuestros Favoritos</h2>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <img src="/images/pan1.jpg" alt="Pan artesanal" />
                        <h3>Pan rústico</h3>
                        <p>Corteza crujiente y suave por dentro.</p>
                    </div>
                    <div className={styles.card}>
                        <img src="/images/pan2.jpg" alt="Croissant" />
                        <h3>Croissant</h3>
                        <p>Hojaldre ligero, mantecoso y fresco cada mañana.</p>
                    </div>
                    <div className={styles.card}>
                        <img src="/images/pan3.jpg" alt="Pan de caja" />
                        <h3>Pan de caja</h3>
                        <p>Ideal para tus desayunos con café.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
