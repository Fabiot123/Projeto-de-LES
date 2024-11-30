"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/useStore";
import styles from "./HomePagina.module.css";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/libs/axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const { addToCart } = useStore();

  const [b_count, setBCount] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get("/livros");
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.error("Erro ao buscar os livros:", error);
      }
    };

    fetchBooks();
  }, []);

  const increaseQuantity = (index) => {
    const updatedBooks = { ...b_count };
    if (updatedBooks[index]) {
      updatedBooks[index] += 1;
    } else {
      updatedBooks[index] = 1;
    }
    setBCount(updatedBooks);
  };

  const decreaseQuantity = (index) => {
    const updatedBooks = { ...b_count };
    if (updatedBooks[index]) {
      if (updatedBooks[index] > 0) {
        updatedBooks[index] -= 1;
      } else {
        updatedBooks[index] = 0;
      }
    } else {
      updatedBooks[index] = 0;
    }
    setBCount(updatedBooks);
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
          <Link href="/Troca">
            <button data-test="troca" className={styles.styledButton}>
              Minha Trocas
            </button>
          </Link>
          <Link href="/MinhaCompras">
            <button data-test="compras" className={styles.styledButton}>
              Minha Compras
            </button>
          </Link>
          <Link href="/LoginPage">
            <button data-test="login" className={styles.styledButton}>
              Login
            </button>
          </Link>
          <Link href="/Cart">
            <button data-test="carrinho" className={styles.styledButton}>
              Carrinho
            </button>
          </Link>
        </nav>
      </div>

      <section className={styles.newArrivals}>
        <h2>Lançamentos</h2>
        <div className={styles.bookGrid}>
          {books.map((book, index) => (
            <div key={index} className={styles.bookCard}>
              <h3>{book.lvr_ttl}</h3>
              <p>{book.lvr_prc}</p>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.button}
                  data-test="remove-item"
                  onClick={() => decreaseQuantity(book.lvr_id)}
                >
                  -
                </button>
                <span>{b_count[book.lvr_id] || 0}</span>
                <button
                  className={styles.button}
                  data-test="add-item"
                  onClick={() => increaseQuantity(book.lvr_id)}
                >
                  +
                </button>
                <button
                  className={styles.button}
                  data-test="add-carrinho"
                  onClick={() => addToCart(book, b_count[book.lvr_id])}
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
