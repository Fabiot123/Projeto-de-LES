"use client";

import { useState, useEffect } from "react";
import { api } from "@/libs/axios";
import BookForm from "@/components/BookForm";
import BookList from "@/components/BookList";
import styles from "@/components/BookForm/BookForm.module.css";

const Home = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard de Livros</h1>
      <BookForm onBookAdded={fetchBooks} />{" "}
      <BookList
        books={books}
        onBookDeleted={fetchBooks}
        onBookUpdated={fetchBooks}
      />
    </div>
  );
};

export default Home;
