"use client";
import React from 'react';
import styles from './UserManagement.module.css';
import Link from 'next/link';
import {toast} from "react-toastify"
import { userService } from '@/services/entities/userService';
import { useUserQuery } from '@/services/query/userQuery';
export default function UserManagement() {
    const {data: users, isLoading, refetch} = useUserQuery();
    // const [users, setUsers] = useState([]);
    console.log(users);
    const handleDelete = async (id) => {
await userService.delete(id);
refetch();
toast.error("Cliente excluido!");
    }
     return (
        <div className={styles.container}>
            <h2 className={styles.title}>Usuários</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Gênero</th>
                        <th>Telefone</th>
                        <th>Data de Nacimento</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                    {/* <tr>
                        <th><input /></th>
                        <th><input /></th>
                        <th><input /></th>
                        <th><input /></th> 
                        <th><input /></th>
                        <th><input /></th>
                        <th><button>Pesquisar</button></th>
                    </tr> */}
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index}>
                            <td>{user.cli_name}</td>
                            <td>{user.cli_cpf}</td>
                            <td>{user.cli_gen}</td>
                            <td>({user.cli_tel.tel_ddd}) {user.cli_tel.tel_num}</td>
                            <td>{user.cli_dt_nasc}</td>
                            <td>{user.cli_email}</td>
                            <td>
                                <Link className={styles.editButton} href={`/Admin/Users/${user.cli_id}`}>Editar</Link>
                                <button className={styles.deleteButton} onClick={() => {
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
