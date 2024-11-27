"use client";
import React, { useEffect, useState } from "react";
import styles from "./MinhaCompras.module.css";
import Link from "next/link";
import { useVendaQuery } from "@/services/query/vendaQuery";
import { api } from "@/libs/axios";

export default function VendasManagement() {
  const { data: vendas } = useVendaQuery();
  const [filteredVendas, setFilteredVendas] = useState([]);
  const [reembolso, setReembolso] = useState({}); // Estado para controlar os reembolsos

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cliId = user?.cli_id;

    if (vendas && cliId) {
      const vendasDoCliente = vendas.filter(
        (venda) => venda.crn_cli_id === cliId
      );
      setFilteredVendas(vendasDoCliente);
    }
  }, [vendas]);

  const handleSelect = (vendaId, itemId) => {
    setReembolso((prev) => ({
      ...prev,
      [vendaId]: {
        ...prev[vendaId],
        [itemId]: prev[vendaId]?.[itemId] || 0, // Adiciona o item com 0 caso ainda não esteja selecionado
      },
    }));
  };

  const handleQuantityChange = (vendaId, itemId, quantity, maxQuantity) => {
    if (quantity >= 0 && quantity <= maxQuantity) {
      setReembolso((prev) => ({
        ...prev,
        [vendaId]: {
          ...prev[vendaId],
          [itemId]: quantity,
        },
      }));
    }
  };

  const handleSubmitReembolso = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cliId = user?.cli_id;

    const trocaData = {
      clientID: cliId,
      items: [],
    };

    Object.keys(reembolso).forEach((vendaId) => {
      if (reembolso[vendaId]) {
        Object.keys(reembolso[vendaId]).forEach((itemId) => {
          const quantity = reembolso[vendaId][itemId];
          console.log(itemId);

          if (quantity > 0) {
            trocaData.items.push({
              itemCarID: itemId,
              quantidade: quantity,
            });
          }
        });
      }
    });

    try {
      console.log(JSON.stringify(trocaData));
      const response = await api.post("/trocas", trocaData);

      if (response.status !== 201) {
        throw new Error(
          `Erro ao solicitar troca: ${response.statusText}. Detalhes: ${
            response.data.message || response.data
          }`
        );
      }

      const data = response.data;
      console.log("Troca solicitada com sucesso:", data);
      console.log("Dados da troca:", trocaData);

      alert("Troca solicitada com sucesso!");
      setReembolso({});
    } catch (error) {
      console.error("Erro ao solicitar troca:", error);
      alert(
        `Erro ao solicitar troca. Tente novamente. Detalhes: ${error.message}`
      );
    }
  };

  const isReembolsoEnabled = Object.keys(reembolso).some((vendaId) =>
    Object.keys(reembolso[vendaId] || {}).some(
      (itemId) => reembolso[vendaId][itemId] > 0
    )
  );

  const hasEligibleVendas = filteredVendas.some(
    (venda) => venda.crn_status === "Entregue"
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Minhas Vendas</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Produtos - Quantidade</th>
            <th>Selecionar para Reembolso</th>
            <th>Quantidade para Reembolso</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendas.map((venda) => (
            <tr key={venda.crn_id}>
              <td>
                {venda.crn_icr.map((item) => (
                  <div key={item.icr_lvr.lvr_id}>
                    {item.icr_lvr.lvr_ttl} - {item.icr_qtn} unidade(s)
                  </div>
                ))}
              </td>
              <td>
                {venda.crn_status === "Entregue" ? (
                  venda.crn_icr.map((item) => (
                    <div key={item.icr_lvr.lvr_id}>
                      <input
                        type="checkbox"
                        onChange={() =>
                          handleSelect(venda.crn_id, item.icr_lvr.lvr_id)
                        }
                      />
                    </div>
                  ))
                ) : (
                  <span className={styles.notAvailable}>
                    Não disponível para reembolso
                  </span>
                )}
              </td>
              <td>
                {venda.crn_status === "Entregue" ? (
                  venda.crn_icr.map((item) => (
                    <div key={item.icr_id}>
                      <input
                        type="number"
                        min="0"
                        max={item.icr_qtn}
                        value={reembolso[venda.crn_id]?.[item.icr_id] || ""}
                        placeholder="Quantidade"
                        className={styles.quantityInput}
                        style={{ width: "100px" }}
                        onChange={(e) =>
                          handleQuantityChange(
                            venda.crn_id,
                            item.icr_id,
                            parseInt(e.target.value, 10) || 0,
                            item.icr_qtn
                          )
                        }
                      />
                    </div>
                  ))
                ) : (
                  <span>-</span>
                )}
              </td>
              <td>{venda.crn_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasEligibleVendas && isReembolsoEnabled && (
        <button className={styles.styledButton} onClick={handleSubmitReembolso}>
          Confirmar Reembolso
        </button>
      )}
      <Link href="/HomePagina">
        <button className={styles.styledButton}>Voltar às Compras</button>
      </Link>
    </div>
  );
}
