import React, { forwardRef } from "react"
import styles from "./DefaultSelect.module.css"

const DefaultSelect = forwardRef(({
    fieldname, fieldlabel, fieldvalue, fieldchange, options,
    ...rest
}, ref) => {
    const renderOption = () =>{
        return (
            <>{options.map((option) => 
            <option key={option.value+fieldname} value={option.value ?? ""}>{option.label}</option>)}</>
        ); 
    }
    return (
        <div className={styles.selectContainer}>
            <h3 className={styles.selectTitle}>{fieldlabel}</h3>
            <select id={fieldname} className={styles.selectField} {...rest} ref={ref}>
                {renderOption()}
            </select>
        </div>
    );
})

export default DefaultSelect;