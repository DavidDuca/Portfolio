import { useState } from "react";
import { FaPlay, FaGithub } from "react-icons/fa6";
import Modal from "../Modal/Modal";
import styles from "./Projects.module.css";

const projects = [
  {
    name: "GrillSync",
    type: "Restaurant Management",
    bg: "gs",
    desc: "A streamlined restaurant and grill management platform handling order tracking, inventory monitoring, and staff coordination in real time. Designed to minimize kitchen chaos and maximize service efficiency during peak hours.",
    stack: ["React", "Node.js", "Express", "Tailwind CSS", "Socket.io"],
    url: "https://grillsync.app",
  },
  {
    name: "SeedLynx",
    type: "AgriTech · Startup",
    bg: "sl",
    desc: "A professional startup dedicated to high-impact web development and professional multimedia services. We help businesses streamline their operations and enhance their brand presence with custom web platforms, booking systems, and creative storytelling.",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    url: "https://seedlynx.com",
  },
  {
    name: "Whispr",
    type: "Real-time Messaging",
    bg: "wh",
    desc: "A real-time messaging app inspired by NGL with safety in mind — designed to catch abusive senders. Built on WebSockets for near-instant delivery, it features clean threaded conversations, presence, and sender pinpoint location via GPS, browser metadata, and network heuristics.",
    stack: ["React", "WebSocket", "Node.js", "Express", "JWT"],
    url: "https://whispr.app",
  },
  {
    name: "RiceWise",
    type: "AgriTech · Analytics",
    bg: "rw",
    desc: "An intelligent rice production advisory system providing data-driven yield optimization, weather integration, and AI-powered crop health recommendations tailored specifically for Philippine rice farming practices.",
    stack: ["HTML", "Tailwind CSS", "PHP", "MySQL"],
    url: "https://ricewise.app",
  },
];

const Projects = () => {
  const [modal, setModal] = useState<{ open: boolean; name: string; url: string }>({
    open: false, name: "", url: "",
  });

  return (
    <section id="projects" className={styles.projects}>
      <div className="ctr">
        <div className="tag">Projects</div>
        <h2 className="sec-title">What I've Built</h2>
        <p className="sec-sub">
          A curated selection of projects showcasing my range across web application development,
          real-time systems design, and agri-tech innovation.
        </p>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <div key={p.name} className={`${styles.card} rv ${i === 1 ? "d1" : i === 2 ? "d2" : i === 3 ? "d3" : ""}`}>
              <div className={styles.banner}>
                <div className={`${styles.bg} ${styles[`bg_${p.bg}`]}`} />
                <div className={styles.bannerTxt}>
                  <div className={styles.bannerName}>{p.name}</div>
                  <div className={styles.bannerType}>{p.type}</div>
                </div>
              </div>
              <div className={styles.body}>
                <div className={styles.title}>{p.name}</div>
                <div className={styles.desc}>{p.desc}</div>
                <div className={styles.stack}>
                  {p.stack.map((s) => <span key={s} className={styles.stk}>{s}</span>)}
                </div>
                <div className={styles.btns}>
                  <button
                    className={styles.btnDemo}
                    onClick={() => setModal({ open: true, name: p.name, url: p.url })}
                  >
                    <FaPlay /> Live Demo
                  </button>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.btnGh}>
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={modal.open}
        title="Under Maintenance"
        body={`${modal.name} is currently being updated and improved. Please check back soon — it'll be worth the wait!`}
        url={modal.url}
        onClose={() => setModal({ open: false, name: "", url: "" })}
      />
    </section>
  );
};

export default Projects;
