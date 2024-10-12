"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/useStore";
import styles from "./HomePagina.module.css";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [books, setBooks] = useState([]);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Erro ao buscar os livros:", error);
      }
    };

    fetchBooks();
  }, []);

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
          <Link href="/LoginPage">
            <button className={styles.styledButton}>Login</button>
          </Link>
          <Link href="/Cart">
            <button className={styles.styledButton}>Carrinho</button>
          </Link>
        </nav>
      </div>

      <section className={styles.newArrivals}>
        <h2>Lançamentos</h2>
        <div className={styles.bookGrid}>
          {books.map((book, index) => (
            <div key={index} className={styles.bookCard}>
              <h3>{book.title}</h3>
              <p>{book.price}</p>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.button}
                  onClick={() => decreaseQuantity(index)}
                >
                  -
                </button>
                <span>{book.quantity || 0}</span>
                <button
                  className={styles.button}
                  onClick={() => increaseQuantity(index)}
                >
                  +
                </button>
                <button
                  className={styles.button}
                  onClick={() => addToCart(book)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
