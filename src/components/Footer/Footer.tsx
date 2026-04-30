import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import styles from "./Footer.module.css";

const Footer = () => {
  const yr = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#home" className={styles.logo}>David Rupert</a>
            <p>Co-founder of SeedLynx. Building at the intersection of networks and the modern web.</p>
          </div>

          <div className={styles.links}>
            <Col title="Navigate" items={[
              { l: "Home", h: "#home" }, { l: "About", h: "#about" }, { l: "Skills", h: "#skills" },
              { l: "Projects", h: "#projects" }, { l: "Certifications", h: "#certifications" }, { l: "Contact", h: "#contact" },
            ]} />
            <Col title="Projects" items={[
              { l: "GrillSync", h: "#projects" },
              { l: "SeedLynx ↗", h: "https://seedlynx.vercel.app", ext: true },
              { l: "Whispr", h: "#projects" },
              { l: "RiceWise", h: "#projects" },
            ]} />
            <Col title="Connect" items={[
              { l: "GitHub ↗", h: "https://github.com/DavidDuca", ext: true },
              { l: "LinkedIn ↗", h: "https://www.linkedin.com/in/david-rupert-duca-578a96388/", ext: true },
              { l: "Facebook ↗", h: "https://www.facebook.com/davidrupert.cabreraduca.1", ext: true },
            ]} />
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            © {yr} <em>David Rupert Duca</em>. All rights reserved.
          </div>
          <div className={styles.soc}>
            <a href="https://github.com/DavidDuca" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/david-rupert-duca-578a96388/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://www.facebook.com/davidrupert.cabreraduca.1" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Col = ({ title, items }: { title: string; items: { l: string; h: string; ext?: boolean }[] }) => (
  <div className={styles.col}>
    <div className={styles.colTitle}>{title}</div>
    <ul>
      {items.map((it) => (
        <li key={it.l}>
          <a href={it.h} {...(it.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{it.l}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
