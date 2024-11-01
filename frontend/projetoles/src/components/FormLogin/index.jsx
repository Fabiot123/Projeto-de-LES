"use client";
import { useForm } from "react-hook-form";
import styles from "./FormLogin.module.css";
import Link from "next/link";
import { api } from "@/libs/axios";

export default function FormLogin() {
  const { register, handleSubmit } = useForm();

  async function onSubmit(values) {
    try {
      const { data } = await api.post("/authentic", values);
      console.log("Login bem-sucedido:", data);
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error.message);
      alert(
        "Erro ao realizar login: " +
          (error.response?.data?.message || "Verifique suas credenciais.")
      );
    }
  }

  return (
    <div className={styles.logincontainer}>
      <form className={styles.loginform} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor={"email"}>Email</label>
        <input type="email" {...register("email")} id="email" required />

        <label htmlFor={"password"}>Senha</label>
        <input
          type="password"
          {...register("password")}
          id="password"
          required
        />

        <button type="submit">Login</button>
        <Link href={"http://localhost:3000/HomePagina"}>
          <p className={styles.shopping}>Voltar pra Pagina Inicial</p>
        </Link>
      </form>
    </div>
  );
}
