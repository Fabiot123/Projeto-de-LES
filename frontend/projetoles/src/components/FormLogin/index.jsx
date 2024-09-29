"use client";
import {useForm} from "react-hook-form";
import styles from "./FormLogin.module.css"

export default function FormLogin () {
    const { register, handleSubmit } = useForm()
    function onSubmit (value) {
        console.log(value)
    }
    return (
        <div className={styles.logincontainer}>
            <form className={styles.loginform} onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor={"email"}>Email</label>
                        <input type="email" {...register("email")} id="email" />
                    
                        <label htmlFor={"senha"}>Senha</label>
                        <input type="password" {...register("senha")} id="senha" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
} 