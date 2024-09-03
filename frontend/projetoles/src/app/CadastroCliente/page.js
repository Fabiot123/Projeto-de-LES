'use client'

import styles from "./CadastroCliente.module.css"
import React,{useState} from "react";
import FormClient from "@/components/FormClient";

export default function Page(){
    return( 
    <div>

        <div className={styles.countainer}>

            <h1 className={styles.formSection}>
                Cadastro de Cliente
            </h1>
            <FormClient />

        </div>

    </div>
        
    );
}