"use client";
import React, { useEffect, useState } from "react";
import styles from "./VendasManagement.module.css";
import Link from "next/link";
import { vendaService } from "@/services/entities/vendaService";
import { useVendaQuery } from "@/services/query/vendaQuery";
import { toast } from "react-toastify";

export default function VendasManagement() {
  const { data: vendas, refetch } = useVendaQuery();

  const TipoStatusVendas = [
    "Em_Processamento",
    "Pagamento_Realizado",
    "Pedido_Cancelado",
    "Pagamento_Recusado",
    "Em_Transporte",
    "Entregue",
  ];

  const handleChangeStatus = async (id, newStatus) => {
    try {
      await vendaService.update(id, { status: newStatus }); // Chama o serviço para atualizar
      toast.success("Status atualizado com sucesso!");
      refetch(); // Atualiza os dados na interface
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o status.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vendas</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Produtos - Quantidade</th>
            <th>Cupons</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vendas?.map((venda, index) => (
            <tr key={index}>
              <td>{venda.crn_cli.cli_name}</td>
              <td>
                {venda.crn_icr.map((item) => (
                  <div key={item.icr_lvr.lvr_ttl}>
                    {item.icr_lvr.lvr_ttl} - {item.icr_qtn} unidade(s)
                  </div>
                ))}
              </td>
              <td>
                {venda.crn_cpn.length > 0 ? (
                  venda.crn_cpn.map((cupom) => (
                    <div key={cupom.cpn_id}>{cupom.cpn_code}</div>
                  ))
                ) : (
                  <span>Sem cupom</span>
                )}
              </td>
              <td>
                <select
                  className={styles.statusSelect}
                  value={venda.crn_status} // Status atual
                  onChange={(e) =>
                    handleChangeStatus(venda.crn_id, e.target.value)
                  } // Atualiza o status
                >
                  {TipoStatusVendas.map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/_/g, " ")} {/* Formata para leitura */}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
