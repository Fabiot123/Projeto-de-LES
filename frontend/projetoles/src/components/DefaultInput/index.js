import React, { forwardRef } from "react"
import styles from "./DefaultInput.module.css"

const DefaultInput = forwardRef(({
    fieldname, fieldlabel, fieldvalue, fieldchange, fieldplaceholder,
    ...rest
}, ref) => {
    return (
        <div className={styles.inputContainer}>
            <h3 className={styles.inputTitle}>{fieldlabel}</h3>
            <input 
                id={fieldname} 
                value={fieldvalue} 
                onChange={(value) => fieldchange(value.target.value)} 
                placeholder={fieldplaceholder}
                {...rest}
                ref={ref}
                className={styles.inputField}
            />
        </div>
    );
})

export default DefaultInput;