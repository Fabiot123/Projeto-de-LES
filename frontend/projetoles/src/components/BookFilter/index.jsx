import { useState } from "react";
import styles from "./BookFilter.module.css";

const BookFilter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState({
    title: "",
    author: "",
    status: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
    onFilterChange({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div className={styles.filterContainer}>
      <label>Título</label>
      <input
        type="text"
        name="title"
        value={filter.title}
        onChange={handleChange}
        placeholder="Filtrar por título"
      />

      <label>Autor</label>
      <input
        type="text"
        name="author"
        value={filter.author}
        onChange={handleChange}
        placeholder="Filtrar por autor"
      />

      <label>Status</label>
      <select name="status" value={filter.status} onChange={handleChange}>
        <option value="">Todos</option>
        <option value="ATIVADO">Ativado</option>
        <option value="DESATIVADO">Desativado</option>
      </select>

      <label>Categoria</label>
      <input
        type="text"
        name="category"
        value={filter.category}
        onChange={handleChange}
        placeholder="Filtrar por categoria"
      />
    </div>
  );
};

export default BookFilter;
