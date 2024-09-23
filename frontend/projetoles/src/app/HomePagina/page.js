// pages/index.js
import React from 'react';
import Image from 'next/image';
import styles from '../HomePagina/HomePagina.module.css';
import Link from 'next/link';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image 
            src="/images/OIG2.jpg"
            alt="Logo"
            width={130}
            height={130}
            className={styles.logoImage}
          />
        </div>
        <nav className={styles.nav}>
          <Link href="http://localhost:3000">
            <button>Login</button>
          </Link>
          <button>Carrinho</button>
        </nav>
      </header>
        
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Populares!</h1>
          <p>
            Livros mais vendidos da nossa livraria!
          </p>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className={styles.newArrivals}>
        <h2>Lançamentos</h2>
        <div className={styles.bookGrid}>
          <div className={styles.bookCard}>
            <p>Example 0</p>
            <p>R$45,80</p>
          </div>
          <div className={styles.bookCard}>
            <p>Example 1</p>
            <p>R$24</p>
          </div>
          <div className={styles.bookCard}>
            <p>Example 2</p>
            <p>R$17</p>
          </div>
          <div className={styles.bookCard}>
            <p>Example 3</p>
            <p>R$27</p>
          </div>
          <div className={styles.bookCard}>
            <p>Example 4</p>
            <p>R$17</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
