"use client";
import {useForm} from "react-hook-form";

export default function FormLogin () {
    const { register, handleSubmit } = useForm()
    function onSubmit (value) {
        console.log(value)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <label htmlFor={"email"}>Email</label>
                    <input type="email" {...register("email")} id="email" />
                </div>
                <div>
                    <label htmlFor={"senha"}>Senha</label>
                    <input type="password" {...register("senha")} id="senha" />
                </div>
            </div>
            <button type="submit">Login</button>
        </form>
    )
} 