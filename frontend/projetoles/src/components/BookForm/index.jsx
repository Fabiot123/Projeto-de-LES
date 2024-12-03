import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "@/libs/axios";
import styles from "./BookForm.module.css";

const BookForm = ({ onBookAdded }) => {
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
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/books/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Dados do formulário:", formData);

    try {
      const livroData = {
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
      console.log("Dados enviados:", livroData);
      await api.post("/books", livroData);
      onBookAdded();
      toast.success("Livro adicionado com sucesso!");
      setFormData({
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
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      setError(
        "Erro ao adicionar livro. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      <label>Autor</label>
      <input
        type="text"
        name="lvr_atr"
        value={formData.lvr_atr}
        onChange={handleChange}
        required
      />

      <label>Título</label>
      <input
        type="text"
        name="lvr_ttl"
        value={formData.lvr_ttl}
        onChange={handleChange}
        required
      />

      <label>ISBN</label>
      <input
        type="text"
        name="lvr_ISBN"
        value={formData.lvr_ISBN}
        onChange={handleChange}
        required
      />

      <label>Ano</label>
      <input
        type="number"
        name="lvr_ano"
        value={formData.lvr_ano}
        onChange={handleChange}
        required
      />

      <label>Número de Páginas</label>
      <input
        type="number"
        name="lvr_num_pag"
        value={formData.lvr_num_pag}
        onChange={handleChange}
        required
      />

      <label>Sinopse</label>
      <textarea
        name="lvr_snp"
        value={formData.lvr_snp}
        onChange={handleChange}
        required
      />

      <label>Altura (cm)</label>
      <input
        type="number"
        name="lvr_alt"
        value={formData.lvr_alt}
        onChange={handleChange}
        required
      />

      <label>Largura (cm)</label>
      <input
        type="number"
        name="lvr_lar"
        value={formData.lvr_lar}
        onChange={handleChange}
        required
      />

      <label>Peso (kg)</label>
      <input
        type="number"
        name="lvr_pes"
        value={formData.lvr_pes}
        onChange={handleChange}
        required
      />

      <label>Profundidade (cm)</label>
      <input
        type="number"
        name="lvr_prf"
        value={formData.lvr_prf}
        onChange={handleChange}
        required
      />

      <label>Status</label>
      <select
        name="lvr_stt"
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
        name="lvr_prc"
        value={formData.lvr_prc}
        onChange={handleChange}
        required
      />

      <label>Código de Barras</label>
      <input
        type="text"
        name="lvr_cod_brr"
        value={formData.lvr_cod_brr}
        onChange={handleChange}
        required
      />

      <label>Quantidade em Estoque</label>
      <input
        type="number"
        name="lvr_qnt"
        value={formData.lvr_qnt}
        onChange={handleChange}
        required
      />

      <label>Categoria</label>
      <select
        name="lvr_cat"
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

      <button data-test="criar-livro" type="submit">
        Adicionar Livro
      </button>
    </form>
  );
};

export default BookForm;
