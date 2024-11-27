"use client";
import React from "react";
import styles from "./TrocaManagement.module.css";
import { trocaService } from "@/services/entities/trocaService";
import { useTrocaQuery } from "@/services/query/trocaQuery";
import { toast } from "react-toastify";
import { api } from "@/libs/axios";

export default function TrocasManagement() {
  const { data: trocas, refetch } = useTrocaQuery();

  const TipoStatusTroca = [
    "Aberto",
    "Em_Troca",
    "Troca_Autorizada",
    "Troca_Recusada",
    "Troca_Realizada",
  ];

  const handleGenerateCoupon = async (trocaId) => {
    try {
      const valorCupom = Math.random() * (40 - 20) + 20;
      const codigoCupom = `CUPOM${Date.now()}`;

      const novoCupom = {
        codigo: codigoCupom,
        preco: parseFloat(valorCupom.toFixed(2)),
        troca: trocaId,
      };

      console.log(trocaId);

      const response = await api.post("/cupons", novoCupom);

      if (response.status !== 201) {
        throw new Error(
          `Erro ao criar cupom: ${response.statusText}. Detalhes: ${
            response.data.message || response.data
          }`
        );
      }
      toast.success("Cupom gerado com sucesso!");
      refetch();
    } catch (error) {
      console.error("Erro ao gerar cupom:", error);
      toast.error("Erro ao gerar cupom. Tente novamente.");
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      await trocaService.update(id, { status: newStatus });
      toast.success("Status atualizado com sucesso!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o status.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trocas</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Produtos em Troca - Quantidade</th>
            <th>Status</th>
            <th>Gerar Cupom</th>
          </tr>
        </thead>
        <tbody>
          {trocas?.map((troca) => (
            <tr key={troca.trc_id}>
              <td>{troca.trc_cli.cli_name}</td>
              <td>
                {troca.trc_itc.map((item) => (
                  <div key={item.itc_icr.icr_lvr.lvr_ttl}>
                    {item.itc_icr.icr_lvr.lvr_ttl} - {item.itc_qtn} unidade(s)
                  </div>
                ))}
              </td>
              <td>
                <select
                  className={styles.statusSelect}
                  value={troca.trc_status}
                  onChange={(e) =>
                    handleChangeStatus(troca.trc_id, e.target.value)
                  }
                >
                  {TipoStatusTroca.map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {troca.trc_cpn ? (
                  <div>
                    <strong>Cupom:</strong> {troca.trc_cpn.cpn_code} <br />
                    <strong>Valor:</strong> R${" "}
                    {troca.trc_cpn.cpn_prc.toFixed(2)}
                  </div>
                ) : (
                  <button
                    className={styles.generateButton}
                    onClick={() => handleGenerateCoupon(troca.trc_id)}
                  >
                    Gerar Cupom
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
