// components/LivrosVendidosPorCategoria.js
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
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  useEffect(() => {
    api.get("/dashboard/categorias").then((response) => {
      setCategorias(response.data);
    });
  }, []);

  useEffect(() => {
    if (categoriaSelecionada) {
      api
        .get(`/dashboard/livros-por-categoria`, {
          params: { categoria: categoriaSelecionada },
        })
        .then((response) => {
          setLivros(response.data);
        });
    }
  }, [categoriaSelecionada]);

  const handleCategoriaChange = (e) => {
    setCategoriaSelecionada(e.target.value);
  };

  return (
    <div className={styles.dashboardcontainer}>
      <h1 className={styles.dashboardtitle}>Dashboard</h1>
      <div className={styles.categoryselector}>
        <label>Selecione uma Categoria:</label>
        <select onChange={handleCategoriaChange}>
          <option value="">Selecione</option>
          {categorias.map((cat) => (
            <option key={cat.cat_id} value={cat.cat_nome}>
              {cat.cat_nome}
            </option>
          ))}
        </select>
      </div>
      {categoriaSelecionada && (
        <div className={styles.chartcontainer}>
          <LineChart
            width={600}
            height={300}
            data={livros}
            className={styles.linechart}
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
