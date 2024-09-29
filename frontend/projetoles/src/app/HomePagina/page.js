"use client"
import React from 'react';
import {useState} from 'react';
import Image from 'next/image';
import styles from './HomePagina.module.css';
import Link from 'next/link';

const Home = () => {
  const [books, setBooks] = useState([
    { title: "Example 0", price: "R$45,80", quantity: 0 },
    { title: "Example 1", price: "R$24", quantity: 0 },
    { title: "Example 2", price: "R$17", quantity: 0 },
    { title: "Example 3", price: "R$27", quantity: 0 },
    { title: "Example 4", price: "R$17", quantity: 0 },
  ]);

  const increaseQuantity = (index) => {
    const updatedBooks = [...books];
    updatedBooks[index].quantity += 1;
    setBooks(updatedBooks);
  };

  const decreaseQuantity = (index) => {
    const updatedBooks = [...books];
    if (updatedBooks[index].quantity > 0) {
      updatedBooks[index].quantity -= 1;
    }
    setBooks(updatedBooks);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image 
            src="/images/OIG2.jpg"
            alt="Logo"
            width={130}
            height={130}
            className={styles.logoImage}
          />
          <h1 className={styles.title}>Livraria Aurora</h1>
        </div>
        <nav className={styles.nav}>
          <Link href="http://localhost:3000">
            <button className={styles.styledButton}>Login</button>
          </Link>
          <button className={styles.styledButton}>Carrinho</button>
        </nav>
      </div>
        
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Populares!</h1>
          <p>
            Livros mais vendidos da nossa livraria!
          </p>
        </div>
      </section>

      <section className={styles.newArrivals}>
        <h2>Lançamentos</h2>
        <div className={styles.bookGrid}>
          {books.map((book, index) => (
            <div key={index} className={styles.bookCard}>
              <h3>{book.title}</h3>
              <p>{book.price}</p>
              <div className={styles.buttonGroup}>
              <button className={styles.button} onClick={() => decreaseQuantity(index)}>-</button>
              <span>{book.quantity}</span>
              <button className={styles.button} onClick={() => increaseQuantity(index)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
