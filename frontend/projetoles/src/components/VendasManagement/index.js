"use client";
import React from 'react';
import styles from './UserManagement.module.css';
import Link from 'next/link';
import {toast} from "react-toastify"
import { userService } from '@/services/entities/userService';
import { useUserQuery } from '@/services/query/userQuery';
import { formatDate } from '@/libs/datefns'

export default function UserManagement() {
     return (
        <div className={styles.container}>
            <h2 className={styles.title}>Usuários</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome do Cliente</th>
                        <th>Data de Entrada</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index}>
                            <td>{user.cli_name}</td>
                            <td>{formatDate(user.cli_dt_nasc)}</td>
                            <td>{user.cli_email}</td>
                            <td>
                                <Link className={styles.editButton} data-test="update-button" href={`/Admin/Users/${user.cli_id}`}>View</Link>
                                <button className={styles.deleteButton} data-test="delete-button" onClick={() => {
                                    handleDelete(user.cli_id)
                                }}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ); 
}
