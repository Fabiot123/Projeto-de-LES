import { useState, useEffect } from "react";
import { api } from "@/libs/axios";
import styles from "./BookEditForm.module.css";

const BookEditForm = ({ bookId, onBookUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    lvr_atr: "",
    lvr_ttl: "",
    lvr_ISBN: "",
    lvr_ano: "",
    lvr_num_pag: "",
    lvr_snp: "",
    lvr_alt: "",
    lvr_lar: "",
    lvr_pes: "",
    lvr_prf: "",
    lvr_stt: "ATIVADO",
    lvr_prc: "",
    lvr_cod_brr: "",
    lvr_qnt: "",
    lvr_cat: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${bookId}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Erro ao buscar livro:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await api.get("/books/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchBook();
    fetchCategorias();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        lvr_ano: parseInt(formData.lvr_ano, 10),
        lvr_num_pag: parseInt(formData.lvr_num_pag, 10),
        lvr_alt: parseFloat(formData.lvr_alt),
        lvr_lar: parseFloat(formData.lvr_lar),
        lvr_pes: parseFloat(formData.lvr_pes),
        lvr_prf: parseFloat(formData.lvr_prf),
        lvr_prc: parseFloat(formData.lvr_prc),
        lvr_qnt: parseInt(formData.lvr_qnt, 10),
        lvr_cat: { connect: { cat_id: formData.lvr_cat } },
      };
      await api.put(`/books/${bookId}`, updatedData);
      onBookUpdated();
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      <label>Autor</label>
      <input
        type="text"
        data-test="atr_edt"
        name="lvr_atr"
        value={formData.lvr_atr}
        onChange={handleChange}
        required
      />

      <label>Título</label>
      <input
        type="text"
        data-test="ttl_edt"
        name="lvr_ttl"
        value={formData.lvr_ttl}
        onChange={handleChange}
        required
      />

      <label>ISBN</label>
      <input
        type="text"
        data-test="ISBN_edt"
        name="lvr_ISBN"
        value={formData.lvr_ISBN}
        onChange={handleChange}
        required
      />

      <label>Ano</label>
      <input
        type="number"
        data-test="ano_edt"
        name="lvr_ano"
        value={formData.lvr_ano}
        onChange={handleChange}
        required
      />

      <label>Número de Páginas</label>
      <input
        type="number"
        data-test="num_pag_edt"
        name="lvr_num_pag"
        value={formData.lvr_num_pag}
        onChange={handleChange}
        required
      />

      <label>Sinopse</label>
      <textarea
        name="lvr_snp"
        data-test="snp_edt"
        value={formData.lvr_snp}
        onChange={handleChange}
        required
      />

      <label>Altura (cm)</label>
      <input
        type="number"
        data-test="alt_edt"
        name="lvr_alt"
        value={formData.lvr_alt}
        onChange={handleChange}
        required
      />

      <label>Largura (cm)</label>
      <input
        type="number"
        data-test="lar_edt"
        name="lvr_lar"
        value={formData.lvr_lar}
        onChange={handleChange}
        required
      />

      <label>Peso (kg)</label>
      <input
        type="number"
        data-test="pes_edt"
        name="lvr_pes"
        value={formData.lvr_pes}
        onChange={handleChange}
        required
      />

      <label>Profundidade (cm)</label>
      <input
        type="number"
        data-test="prf_edt"
        name="lvr_prf"
        value={formData.lvr_prf}
        onChange={handleChange}
        required
      />

      <label>Status</label>
      <select
        name="lvr_stt"
        data-test="stt_edt"
        value={formData.lvr_stt}
        onChange={handleChange}
        required
      >
        <option value="ATIVADO">Ativado</option>
        <option value="DESATIVADO">Desativado</option>
      </select>

      <label>Preço (R$)</label>
      <input
        type="number"
        data-test="prc_edt"
        name="lvr_prc"
        value={formData.lvr_prc}
        onChange={handleChange}
        required
      />

      <label>Código de Barras</label>
      <input
        type="text"
        data-test="cod_brr_edt"
        name="lvr_cod_brr"
        value={formData.lvr_cod_brr}
        onChange={handleChange}
        required
      />

      <label>Quantidade em Estoque</label>
      <input
        type="number"
        data-test="qnt_edt"
        name="lvr_qnt"
        value={formData.lvr_qnt}
        onChange={handleChange}
        required
      />

      <label>Categoria</label>
      <select
        name="lvr_cat"
        data-test="cat_edt"
        value={formData.lvr_cat}
        onChange={handleChange}
        required
      >
        <option value="">Selecione uma Categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.cat_id} value={categoria.cat_id}>
            {categoria.cat_nome}
          </option>
        ))}
      </select>

      <button data-test="atualizar-button" type="submit">
        Atualizar Livro
      </button>
      <button data-test="deletar-button" type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

export default BookEditForm;
