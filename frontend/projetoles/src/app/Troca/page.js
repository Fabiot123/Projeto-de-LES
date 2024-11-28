"use client";
import React, { useEffect, useState } from "react";
import styles from "./Troca.module.css";
import Link from "next/link";
import { useTrocaQuery } from "@/services/query/trocaQuery";

export default function TrocasManagement() {
  const { data: trocas } = useTrocaQuery(); // Busca todas as trocas do banco
  const [filteredTrocas, setFilteredTrocas] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cliId = user?.cli_id;

    if (trocas && cliId) {
      // Filtra as trocas do cliente atual
      const trocasDoCliente = trocas.filter(
        (troca) => troca.trc_cli_id === cliId
      );
      setFilteredTrocas(trocasDoCliente);
    }
  }, [trocas]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Minhas Trocas</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Produtos em Troca - Quantidade</th>
            <th>Status</th>
            <th>Código do Cupom</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrocas.map((troca) => (
            <tr key={troca.trc_id}>
              <td>
                {troca.trc_itc.map((item) => (
                  <div key={item.itc_icr.icr_id}>
                    {item.itc_icr.icr_lvr.lvr_ttl} - {item.itc_qtn} unidade(s)
                  </div>
                ))}
              </td>
              <td>{troca.trc_status.replace(/_/g, " ")}</td>
              <td>
                {troca.trc_status === "Troca_Realizada" ? (
                  troca.trc_cpn ? (
                    <span className={styles.couponCode}>
                      {troca.trc_cpn.cpn_code}
                    </span>
                  ) : (
                    <span className={styles.notAvailable}>
                      Ainda não gerado
                    </span>
                  )
                ) : (
                  <span className={styles.notAvailable}>Ainda não gerado</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <Link href="/HomePagina">
          <button className={styles.styledButton}>Voltar às Compras</button>
        </Link>
      </table>
    </div>
  );
}
