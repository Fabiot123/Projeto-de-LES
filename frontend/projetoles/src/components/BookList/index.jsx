import { useState } from "react";
import { api } from "@/libs/axios";
import BookEditForm from "@/components/BookEditForm";
import styles from "./BookList.module.css";

const BookList = ({ books, onBookDeleted, onBookUpdated }) => {
  const [editingBookId, setEditingBookId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      onBookDeleted();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  const startEditing = (id) => {
    setEditingBookId(id);
  };

  const stopEditing = () => {
    setEditingBookId(null);
  };

  return (
    <div className={styles.bookListContainer}>
      <ul className={styles.bookList}>
        {books.map((book) => (
          <li key={book.lvr_id} className={styles.bookListItem}>
            <div className={styles.bookDetails}>
              <span>
                <strong>Título:</strong> {book.lvr_ttl}
              </span>
              <span>
                <strong>Autor:</strong> {book.lvr_atr}
              </span>
              <span>
                <strong>Quantidade:</strong> {book.lvr_qnt}
              </span>
              <span>
                <strong>Categoria:</strong>
                {book.lvr_cat?.map((cat) => cat.cat_nome).join(", ") ||
                  "Categoria não definida"}
              </span>
              <span>
                <strong>Status:</strong> {book.lvr_stt}
              </span>
            </div>
            <div className={styles.bookListActions}>
              <button onClick={() => handleDelete(book.lvr_id)}>Excluir</button>
              <button onClick={() => startEditing(book.lvr_id)}>Editar</button>
            </div>
            {editingBookId === book.lvr_id && (
              <BookEditForm
                bookId={book.lvr_id}
                onBookUpdated={() => {
                  onBookUpdated();
                  stopEditing();
                }}
                onCancel={stopEditing}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
