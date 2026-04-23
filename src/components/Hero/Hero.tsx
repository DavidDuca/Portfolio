import { useEffect, useRef } from "react";
import { FaLayerGroup, FaRegPaperPlane, FaFacebookF, FaLinkedinIn, FaGithub, FaCode, FaNetworkWired } from "react-icons/fa6";
import davidImg from "@/assets/david.jpg";
import styles from "./Hero.module.css";

const roles = [
  "Co-founder @SeedLynx",
  "Web Developer",
  "Network Technician",
  "Junior Software Engineer",
  "Bonafide student of CHMSU",
];

const Hero = () => {
  const typeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ri = 0, ci = 0, deleting = false, mounted = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (!mounted || !typeRef.current) return;
      const word = roles[ri];
      typeRef.current.textContent = deleting
        ? word.substring(0, ci - 1)
        : word.substring(0, ci + 1);
      deleting ? ci-- : ci++;
      let delay = deleting ? 55 : 95;
      if (!deleting && ci === word.length) { delay = 1900; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 380; }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 600);
    return () => { mounted = false; clearTimeout(timer); };
  }, []);

  return (
    <section id="home" className={styles.hero}>
      <div className="ctr">
        <div className={styles.grid}>
          <div className="rv">
            <div className={styles.greeting}>Hello, I'm</div>
            <h1 className={styles.name}>David Rupert</h1>

            <div className={styles.role}>
              <span className={styles.prefix}>I'm a</span>{" "}
              <span ref={typeRef} className={styles.typeText} />
              <span className={styles.cursor} />
            </div>

            <p className={styles.bio}>
              Bridging the gap between infrastructure and innovation — I build resilient networks
              and craft modern web applications, delivering end-to-end digital solutions
              from the data center all the way to the browser.
            </p>

            <div className={styles.btns}>
              <a href="#projects" className={styles.btnPrimary}>
                <FaLayerGroup /> View Projects
              </a>
              <a href="#contact" className={styles.btnOutline}>
                <FaRegPaperPlane /> Get In Touch
              </a>
            </div>

            <div className={styles.socials}>
              <span className={styles.socLabel}>Follow</span>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socBtn} aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socBtn} aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socBtn} aria-label="GitHub"><FaGithub /></a>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}><div className={styles.statVal}>4<em>+</em></div><div className={styles.statLbl}>Projects</div></div>
              <div className={styles.stat}><div className={styles.statVal}>6<em>+</em></div><div className={styles.statLbl}>Certifications</div></div>
              <div className={styles.stat}><div className={styles.statVal}>1</div><div className={styles.statLbl}>Startup</div></div>
              <div className={styles.stat}><div className={styles.statVal}>∞</div><div className={styles.statLbl}>Curiosity</div></div>
            </div>
          </div>

          <div className={`${styles.right} rv d2`}>
            <div className={styles.photoWrap}>
              <div className={styles.photoCard}>
                <div className={styles.photoInner}>
                  <img src={davidImg} alt="David Rupert Duca" width={768} height={896} />
                </div>
              </div>
              <div className={`${styles.badge} ${styles.badge1}`}>
                <div className={`${styles.badgeIco} ${styles.bicC}`}><FaCode /></div>
                <div className={styles.badgeTxt}>
                  <strong>Web Dev</strong>
                  <span>Frontend &amp; Backend</span>
                </div>
              </div>
              <div className={`${styles.badge} ${styles.badge2}`}>
                <div className={`${styles.badgeIco} ${styles.bicP}`}><FaNetworkWired /></div>
                <div className={styles.badgeTxt}>
                  <strong>IT Infrastructure</strong>
                  <span>Networks &amp; Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
