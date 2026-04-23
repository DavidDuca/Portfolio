import {
  FaWandMagicSparkles, FaServer, FaNetworkWired, FaRobot, FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub, FaGoogle, FaNpm, FaPython, FaGitAlt
} from "react-icons/fa6";
import { SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiPhp, SiSocketdotio, SiPostman, SiCisco, SiVercel, SiTypescript, SiJsonwebtokens, SiYarn, SiPnpm, SiClaude, SiOpenai, SiPostgresql } from "react-icons/si";
import { TbApi, TbBrandReactNative, TbDeviceDesktop, TbRouter, TbSubtask, TbWorld, TbTools, TbServer2, TbShield, TbBinaryTree, TbMessages } from "react-icons/tb";
import { MdDns, MdSecurity, MdRouter } from "react-icons/md";
import styles from "./Skills.module.css";

const skills = [
  {
    color: "cyan",
    icon: <FaWandMagicSparkles />,
    title: "Frontend Development",
    sub: "Web Development",
    tone: "tC",
    tags: [
      { i: <FaHtml5 />, l: "HTML5" },
      { i: <FaCss3Alt />, l: "CSS3" },
      { i: <FaJs />, l: "JavaScript" },
      { i: <SiTypescript />, l: "TypeScript" },
      { i: <FaReact />, l: "React" },
      { i: <SiTailwindcss />, l: "Tailwind CSS" },
      { i: <TbDeviceDesktop />, l: "Responsive Design" },
      { i: <TbBrandReactNative />, l: "DOM Manipulation" },
    ],
  },
  {
    color: "purple",
    icon: <FaServer />,
    title: "Backend Development",
    sub: "Web Development",
    tone: "tP",
    tags: [
      { i: <FaNodeJs />, l: "Node.js" },
      { i: <SiExpress />, l: "Express.js" },
      { i: <TbApi />, l: "REST APIs" },
      { i: <TbSubtask />, l: "Middleware" },
      { i: <SiMongodb />, l: "MongoDB" },
      { i: <SiPostgresql />, l: "PostgreSQL" },
      { i: <SiMysql />, l: "MySQL" },
      { i: <SiPhp />, l: "PHP" },
      { i: <SiJsonwebtokens />, l: "JWT Auth" },
      { i: <SiSocketdotio />, l: "Socket.io" },
    ],
  },
  {
    color: "blue",
    icon: <FaNetworkWired />,
    title: "Hardware & Networking",
    sub: "IT Infrastructure",
    tone: "tB",
    tags: [
      { i: <TbWorld />, l: "TCP/IP" },
      { i: <TbBinaryTree />, l: "OSI Model" },
      { i: <MdDns />, l: "DNS Management" },
      { i: <MdRouter />, l: "DHCP" },
      { i: <SiCisco />, l: "Cisco IOS" },
      { i: <TbServer2 />, l: "Client–Server Config" },
      { i: <TbRouter />, l: "VLANs" },
      { i: <TbBinaryTree />, l: "Subnetting" },
      { i: <TbWorld />, l: "LAN / WAN" },
      { i: <MdSecurity />, l: "Network Security" },
      { i: <TbTools />, l: "Network Troubleshooting" },
      { i: <SiCisco />, l: "Cisco Packet Tracer" },
    ],
  },
  {
    color: "green",
    icon: <FaRobot />,
    title: "AI Tools",
    sub: "Productivity & Dev",
    tone: "tG",
    tags: [
      { i: <FaGoogle />, l: "Gemini" },
      { i: <SiClaude />, l: "Claude" },
      { i: <SiOpenai />, l: "ChatGPT" },
      { i: <TbMessages />, l: "Prompt Engineering" },
      { i: <TbShield />, l: "AI-Assisted Dev" },
    ],
  },
  {
    color: "orange",
    icon: <FaNpm />,
    title: "Dev Tools & Workflow",
    sub: "Tooling",
    tone: "tO",
    tags: [
      { i: <FaNpm />, l: "NPM" },
      { i: <SiPnpm />, l: "PNPM" },
      { i: <SiYarn />, l: "Yarn" },
      { i: <FaGitAlt />, l: "Git" },
      { i: <FaGithub />, l: "GitHub" },
      { i: <SiPostman />, l: "Postman" },
      { i: <SiVercel />, l: "Vercel" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <div className="ctr">
        <div className="tag">Skills</div>
        <h2 className="sec-title">Technical Expertise</h2>
        <p className="sec-sub">
          A purposefully curated toolkit spanning frontend &amp; backend development,
          hardware networking, AI tooling, and dev productivity — each skill honed for real-world impact.
        </p>

        <div className={styles.grid}>
          {skills.map((s, i) => (
            <div key={i} className={`${styles.card} rv ${i === 1 ? "d1" : i === 2 ? "d2" : i >= 3 ? "d3" : ""}`}>
              <div className={styles.head}>
                <div className={`${styles.ico} ${styles[`ico_${s.color}`]}`}>{s.icon}</div>
                <div>
                  <div className={styles.title}>{s.title}</div>
                  <div className={styles.sub}>{s.sub}</div>
                </div>
              </div>
              <div className={styles.tags}>
                {s.tags.map((t, j) => (
                  <span key={j} className={`${styles.tag} ${styles[s.tone]}`}>
                    <span className={styles.tagIco}>{t.i}</span> {t.l}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
