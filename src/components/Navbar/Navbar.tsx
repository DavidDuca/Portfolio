import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certs" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 22);
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      let cur = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 92) cur = s.id;
      });
      if (cur) setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navH = document.getElementById("nav")?.offsetHeight ?? 70;
      window.scrollTo({ top: (target as HTMLElement).offsetTop - navH + 4, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      <nav id="nav" className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.wrap}>
          <a href="#home" className={styles.logo} onClick={(e) => handleClick(e, "#home")}>
            David Rupert
          </a>

          <div className={styles.links}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={active === l.href.slice(1) ? styles.active : ""}
                onClick={(e) => handleClick(e, l.href)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <a href="#contact" className={styles.cta} onClick={(e) => handleClick(e, "#contact")}>
            Avail Service
          </a>

          <button
            className={`${styles.hbg} ${open ? styles.open : ""}`}
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobNav} ${open ? styles.mobOpen : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => handleClick(e, l.href)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className={styles.cta} onClick={(e) => handleClick(e, "#contact")}>
          Avail Service
        </a>
      </div>
    </>
  );
};

export default Navbar;
