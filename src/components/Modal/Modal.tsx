import { useEffect } from "react";
import { FaScrewdriverWrench, FaXmark } from "react-icons/fa6";
import styles from "./Modal.module.css";

interface ModalProps {
  open: boolean;
  title: string;
  body: string;
  url?: string;
  onClose: () => void;
}

const Modal = ({ open, title, body, url, onClose }: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  return (
    <div
      className={`${styles.bg} ${open ? styles.on : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.box}>
        <button className={styles.x} onClick={onClose} aria-label="Close"><FaXmark /></button>
        <div className={styles.icon}><FaScrewdriverWrench /></div>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{body}</div>
        {url && <div className={styles.url}>{url}</div>}
        <button className={styles.close} onClick={onClose}>Got it, thanks!</button>
      </div>
    </div>
  );
};

export default Modal;
