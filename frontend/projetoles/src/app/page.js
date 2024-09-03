import styles from "./page.module.css";
import FormLogin from "@/components/FormLogin"; 

export default function Home() {
  return (
    <main className={styles.main}>
      <FormLogin />
    </main>
  );
}
