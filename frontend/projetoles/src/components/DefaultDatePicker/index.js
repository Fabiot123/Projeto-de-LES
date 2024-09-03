import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DefaultDatePìcker.module.css'

const DefaultDatePicker = ({ fieldname, fieldlabel, fieldvalue, fieldchange }) => {
    const [selectedDate, setSelectDate] = useState(fieldvalue ? new Date(fieldvalue) : null);
    const [manualInput, setManualInput] = useState('');

    const handleDateChange = (date) => {
        if (date) {
            const formattedDate = formatDate(date);
            setSelectDate(date);
            setManualInput(formattedDate);
            fieldchange(formattedDate);
        } else {
            setSelectDate(null);
            setManualInput('');
            fieldchange('');
        }
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleManualInputChange = (e) => {
        const value = e.target.value;

        // Permite que o usuário digite apenas números e "/"
        if (/^[\d/]*$/.test(value)) {
            setManualInput(value);

            // Verifica se a data está no formato dd/MM/yyyy
            if (value.length === 10) {
                const [day, month, year] = value.split('/').map(num => parseInt(num, 10));
                if (isValidDate(day, month, year)) {
                    const date = new Date(year, month - 1, day);
                    setSelectDate(date);
                    fieldchange(value);
                }
            }
        }
    };

    const isValidDate = (day, month, year) => {
        const date = new Date(year, month - 1, day);
        return date && date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year;
    };

    return (
        <div className={styles.datePickerWrapper}>
            <label htmlFor={fieldname}>{fieldlabel}</label>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className={styles.datePickerInput}
                placeholderText="DD/MM/AAAA"
                onChangeRaw={handleManualInputChange}
                customInput={
                    <input 
                        value={manualInput} 
                        onChange={handleManualInputChange}
                        placeholder="DD/MM/AAAA"
                    />
                }
            />
        </div>
    );
}

export default DefaultDatePicker;
