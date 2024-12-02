import { useState, useEffect } from "react";
import { api } from "@/libs/axios";
import styles from "./Chatbot.module.css";

export default function ChatWidget() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [availableBooks, setAvailableBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await api.get("/livros");
        setAvailableBooks(
          data.map((book) => ({
            title: book.lvr_ttl,
            category: book.lvr_cat[0]?.cat_nome,
            synopsis: book.lvr_snp,
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar os livros:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSubmitChatbot = async (e) => {
    e.preventDefault();
    const newMessages = [
      ...messages,
      { message: prompt, sender: "user", timestamp: new Date() },
    ];

    try {
      const { data } = await api.post("/chat", {
        prompt,
        messages: newMessages,
        availableBooks,
      });

      if (data.message) {
        setMessages([
          ...newMessages,
          { message: data.message, sender: "bot", timestamp: new Date() },
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            message: `Eu recomendo: ${data.bookName}. Aqui está a sinopse: ${data.synopsis}`,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }

      setPrompt("");
    } catch (error) {
      console.error("Erro ao obter resposta:", error);
      alert(
        `Erro ao obter resposta. Tente novamente. Detalhes: ${error.message}`
      );
    }
  };

  return (
    <div className={`${styles.chatWidget} ${isOpen ? styles.open : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.toggleButton}
      >
        {isOpen ? "Fechar Chat" : "Abrir Chat"}
      </button>
      {isOpen && (
        <div className={styles.chatContainer}>
          <h1>Chatbot</h1>
          <form onSubmit={handleSubmitChatbot} className={styles.form}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Faça uma pergunta"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Enviar
            </button>
          </form>
          <div className={styles.chat}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? styles.userMessage : styles.botMessage
                }
              >
                {msg.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
