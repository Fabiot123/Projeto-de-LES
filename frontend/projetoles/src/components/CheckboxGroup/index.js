import React from "react";
import styles from "./CheckboxGroup.module.css";

export default function CheckboxGroup({ value, onChange, error }) {
    const handleChange = (event) => {
        const name = event.target.value;
        onChange(value.includes(name) ? value.filter((item) => item !== name) : [...value, name])
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Tipo de Endereço</h3>
            <div className={styles.checkboxGroup}>
                <div className={styles.checkboxOption}>
                    <input
                        type="checkbox"
                        id="residencia"
                        value="Residência"
                        onChange={handleChange}
                        checked={value.includes("Residência")}
                        className={styles.checkboxInput}
                    />
                    <label htmlFor="residencia" className={styles.checkboxLabel}>Residência</label>
                </div>
            </div>
            <div className={styles.checkboxGroup}>
                <div className={styles.checkboxOption}>
                    <input
                        type="checkbox"
                        id="cobranca"
                        value="Cobrança"
                        onChange={handleChange}
                        checked={value.includes("Cobrança")}
                        className={styles.checkboxInput}
                    />
                    <label htmlFor="cobranca" className={styles.checkboxLabel}>Cobrança</label>
                </div>
            </div>
            <div className={styles.checkboxGroup}>
                <div className={styles.checkboxOption}>
                    <input
                        type="checkbox"
                        id="entrega"
                        value="Entrega"
                        onChange={handleChange}
                        checked={value.includes("Entrega")}
                        className={styles.checkboxInput}
                    />
                    <label htmlFor="entrega" className={styles.checkboxLabel}>Entrega</label>
                </div>
            </div>
            {!!error && <span className={styles["input-error-message"]}>{error}</span>}
        </div>
    );
}