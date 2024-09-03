'use client'

import styles from "./CadastroCliente.module.css"
import React from "react";
import FormClient from "@/components/FormClient";
import { useClientByIdQuery } from "@/services/query/userQuery"


export default function Page({params}){
    const { data } = useClientByIdQuery(params.id);
    return( 
        <div>
            <div className={styles.countainer}>

                <h1 className={styles.formSection}>
                    Editar Cliente
                </h1>
                {data ? <FormClient cliente={data} /> : "Carregando"}
            </div>
        </div>
    );
}