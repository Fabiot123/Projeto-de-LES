"use client";
import { useForm } from "react-hook-form";
import styles from "./FormLogin.module.css";
import Link from "next/link";
import { api } from "@/libs/axios";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function onSubmit(values) {
    try {
      const { data } = await api.post("/authentic", values);
      console.log("Login bem-sucedido:", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/HomePagina");
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
        <button data-test="login" type="submit">
          Login
        </button>
        <Link href={"/HomePagina"}>
          <p className={styles.shopping}>Voltar pra Pagina Inicial</p>
        </Link>
      </form>
    </div>
  );
}
