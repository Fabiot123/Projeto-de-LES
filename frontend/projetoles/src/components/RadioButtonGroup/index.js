import React,{useState} from "react";
import styles from "./RadioButtonGroup.module.css";

export default function RadioButtonGroup({ value, onChange }){
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Tipo de Cartão</h3>
            <div className={styles.radioOption}>
                <input
                    type="radio"
                    id="credito"
                    value="Credito"
                    checked={value === "Credito"}
                    onChange={handleChange}
                />
                <label className={styles.radioLabel}>Crédito</label>
            </div>
            <div className={styles.radioOption}>
            <input
                    type="radio"
                    id="debito"
                    value="Debito"
                    checked={value === "Debito"}
                    onChange={handleChange}
                />
                <label className={styles.radioLabel}>Débito</label>
            </div>
        </div>
    );
}