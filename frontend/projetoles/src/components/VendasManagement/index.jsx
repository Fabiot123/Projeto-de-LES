"use client";
import React from "react";
import styles from "./VendasManagement.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { formatDate } from "@/libs/datefns";
import { api } from "@/libs/axios";

export default function VendasClient() {
  useEffect(() => {
    const vendasQuery = async () => {
      try {
        const { data } = await api.post("/authentic");
        console.log(data);
      } catch (e) {
        console.error("Erro", e);
      }
    };

    vendasQuery();
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vendas</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Produtos</th>
            <th>Quantidade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td>{user.cli_name}</td>
              <td>{user.cli_cpf}</td>
              <td>{user.cli_gen}</td>
              <td>
                ({user.cli_tel.tel_ddd}) {user.cli_tel.tel_num}
              </td>
              <td>{formatDate(user.cli_dt_nasc)}</td>
              <td>{user.cli_email}</td>
              <td>
                <Link
                  className={styles.editButton}
                  data-test="update-button"
                  href={`/Admin/Users/${user.cli_id}`}
                >
                  Editar
                </Link>
                <button
                  className={styles.deleteButton}
                  data-test="delete-button"
                  onClick={() => {
                    handleDelete(user.cli_id);
                  }}
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
