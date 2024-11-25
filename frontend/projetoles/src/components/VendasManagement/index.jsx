"use client";
import React, { useEffect, useState } from "react";
import styles from "./VendasManagement.module.css";
import Link from "next/link";
import { formatDate } from "@/libs/datefns";
import { api } from "@/libs/axios";
import { toast } from "react-toastify";

const notifySuccess = (message) => {
  toast.success(message);
};

const notifyError = (message) => {
  toast.error(message);
};

export default function VendasClient() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const { data } = await api.get("/livros");
        setVendas(data);
      } catch (e) {
        notifyError("Erro ao buscar vendas");
        console.error("Erro", e);
      }
    };

    fetchVendas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/livros/${id}`);
      setVendas(vendas.filter((venda) => venda.id !== id));
      notifySuccess("Venda deletada com sucesso");
    } catch (e) {
      notifyError("Erro ao deletar venda");
      console.error("Erro", e);
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await api.put(`/livros/${id}`, { status });
      setVendas(
        vendas.map((venda) => (venda.id === id ? { ...venda, status } : venda))
      );
      notifySuccess("Status atualizado com sucesso");
    } catch (e) {
      notifyError("Erro ao atualizar status");
      console.error("Erro", e);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vendas</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Produtos</th>
            <th>Quantidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda, index) => (
            <tr key={index}>
              <td>{venda.produto}</td>
              <td>{venda.quantidade}</td>
              <td>{venda.status}</td>
              <td>
                <button
                  className={styles.statusButton}
                  onClick={() => handleChangeStatus(venda.id, "NovoStatus")}
                >
                  Atualizar Status
                </button>
                <Link
                  className={styles.editButton}
                  data-test="update-button"
                  href={`/Admin/Users/${venda.id}`}
                >
                  Editar
                </Link>
                <button
                  className={styles.deleteButton}
                  data-test="delete-button"
                  onClick={() => handleDelete(venda.id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
