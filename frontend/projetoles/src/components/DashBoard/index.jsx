import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { api } from "@/libs/axios";
import styles from "./DashBoard.module.css";

const LivrosVendidosPorCategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [livros, setLivros] = useState([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);

  useEffect(() => {
    api
      .get("/dashboard/categorias")
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, []);

  useEffect(() => {
    if (categoriasSelecionadas.length > 0) {
      api
        .get(`/dashboard/livros-por-categoria`, {
          params: { categorias: categoriasSelecionadas.join(",") },
        })
        .then((response) => {
          setLivros(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar livros:", error);
        });
    } else {
      setLivros([]);
    }
  }, [categoriasSelecionadas]);

  const handleCategoriaChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setCategoriasSelecionadas(selectedOptions);
  };

  return (
    <div className={styles.dashboardcontainer}>
      <h1 className={styles.dashboardtitle}>Dashboard</h1>
      <div className={styles.categoryselector}>
        <label>Selecione Categorias:</label>
        <select
          multiple
          onChange={handleCategoriaChange}
          value={categoriasSelecionadas}
        >
          {categorias.map((cat) => (
            <option key={cat.cat_id} value={cat.cat_nome}>
              {cat.cat_nome}
            </option>
          ))}
        </select>
      </div>
      {livros.length > 0 && (
        <div className={styles.chartcontainer}>
          <LineChart
            width={600}
            height={300}
            data={livros}
            className="linechart"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lvr_ttl" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="quantidadeVendida"
              stroke="#8884d8"
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default LivrosVendidosPorCategoria;
