import { useState } from "react";
import { FaEnvelope, FaLocationDot, FaCircleCheck, FaLinkedinIn, FaPaperPlane, FaTriangleExclamation, FaSpinner } from "react-icons/fa6";
import styles from "./Contact.module.css";

type Status = "idle" | "sending" | "success" | "error" | "validation";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  const handle = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("validation");
      setTimeout(() => setStatus("idle"), 2400);
      return;
    }
    setStatus("sending");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Server error (${res.status})`);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    } catch (e: any) {
      setStatus("error");
      setErrMsg(e?.message ?? "Failed to send. Try again later.");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const btnLabel = () => {
    switch (status) {
      case "sending": return <><FaSpinner className={styles.spin} /> Sending…</>;
      case "success": return <><FaCircleCheck /> Message Sent!</>;
      case "validation": return <><FaTriangleExclamation /> Please fill required fields</>;
      case "error": return <><FaTriangleExclamation /> {errMsg || "Failed — try again"}</>;
      default: return <><FaPaperPlane /> Send Message</>;
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className="ctr">
        <div className="tag">Contact</div>
        <h2 className="sec-title">Let's Work Together</h2>

        <div className={styles.grid}>
          <div className="rv">
            <p className={styles.bio}>
              Whether you need a web application architected from scratch, IT infrastructure
              consulted, a network configured, or just want to say hello — I'm always open
              to meaningful collaborations and new opportunities. Let's build something great.
            </p>

            <div className={styles.items}>
              <Row icon={<FaEnvelope />} label="Email" value="davidduca95@gmail.com" />
              <Row icon={<FaLocationDot />} label="Location" value="Philippines" />
              <Row icon={<FaCircleCheck />} label="Availability" value="Open to freelance & collaborations" />
              <Row icon={<FaLinkedinIn />} label="LinkedIn" value="linkedin.com/in/davidrupertduca" />
            </div>
          </div>

          <div className={`${styles.formWrap} rv d2`}>
            <Field label="Name *" value={form.name} onChange={handle("name")} placeholder="Your full name" />
            <Field label="Email *" type="email" value={form.email} onChange={handle("email")} placeholder="your@email.com" />
            <Field label="Subject" value={form.subject} onChange={handle("subject")} placeholder="What's this about?" />
            <div className={styles.fg}>
              <label className={styles.fl}>Message *</label>
              <textarea
                className={styles.fta}
                value={form.message}
                onChange={handle("message")}
                placeholder="Tell me about your project or inquiry..."
                rows={5}
              />
            </div>
            <button
              type="button"
              className={`${styles.fsub} ${styles[`status_${status}`]}`}
              onClick={submit}
              disabled={status === "sending"}
            >
              {btnLabel()}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Row = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className={styles.row}>
    <div className={styles.rowIco}>{icon}</div>
    <div>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  </div>
);

const Field = ({ label, value, onChange, placeholder, type = "text" }: any) => (
  <div className={styles.fg}>
    <label className={styles.fl}>{label}</label>
    <input className={styles.fi} type={type} value={value} onChange={onChange} placeholder={placeholder} />
  </div>
);

export default Contact;
