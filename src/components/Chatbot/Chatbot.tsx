import { useState, useRef, useEffect } from "react";
import { FaRobot, FaXmark, FaPaperPlane, FaSpinner } from "react-icons/fa6";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';
import styles from "./Chatbot.module.css";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm David's AI assistant. Ask me anything about his work, skills, or projects." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: next },
      });
      if (error) throw new Error(error.message || "Chat failed");
      if (data?.error) throw new Error(data.error);
      setMsgs([...next, { role: "assistant", content: data?.reply || "..." }]);
    } catch (e: any) {
      setMsgs([...next, { role: "assistant", content: `⚠️ ${e?.message || "Something went wrong."}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="chatbot-container" className={styles.wrap}>
      {open && (
        <div className={styles.panel}>
          <div className={styles.head}>
            <div className={styles.headLeft}>
              <div className={styles.avatar}><FaRobot /></div>
              <div>
                <div className={styles.title}>Ask David's AI</div>
                <div className={styles.sub}>Powered by Gemini</div>
              </div>
            </div>
            <button className={styles.x} onClick={() => setOpen(false)} aria-label="Close chat">
              <FaXmark />
            </button>
          </div>

          <div className={styles.body} ref={bodyRef}>
           {msgs.map((m, i) => (
              <div key={i} className={`${styles.msg} ${styles[`msg_${m.role}`]}`}>
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className={`${styles.msg} ${styles.msg_assistant}`}>
                <FaSpinner className={styles.spin} /> Thinking…
              </div>
            )}
          </div>

          <div className={styles.inputBar}>
            <input
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your question…"
              disabled={loading}
            />
            <button className={styles.sendBtn} onClick={send} disabled={loading || !input.trim()} aria-label="Send">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle chatbot"
      >
        {open ? <FaXmark /> : <FaRobot />}
      </button>
    </div>
  );
};

export default Chatbot;
