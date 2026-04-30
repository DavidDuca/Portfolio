import { FaTimeline, FaSeedling, FaLightbulb, FaBullseye, FaBuildingColumns, FaSchool, FaBriefcase, FaUserTie } from "react-icons/fa6";
import styles from "./About.module.css";

const education = [
  {
    title: "BS in Information Systems",
    date: "2025 – Present",
    org: "Carlos Hilado Memorial State University",
    icon: <FaBuildingColumns />,
    color: "cyan",
    desc: "Pursuing a Bachelor of Science in Information Systems (BSIS) under a comprehensive curriculum designed to develop strong competencies in information systems analysis and design, database management, enterprise systems, business process automation, and modern software development practices.",
  },
  {
    title: "Senior High School — ICT Strand",
    date: "2023 – 2025",
    org: "E. B. Magalona National High School",
    icon: <FaSchool />,
    color: "purple",
    desc: "Completed the ICT strand with a strong foundation in computer systems, network fundamentals, and technical problem-solving.",
  },
  {
    title: "Junior High School",
    date: "2019 – 2023",
    org: "E. B. Magalona National High School",
    icon: <FaSchool />,
    color: "green",
    desc: "Gained foundational knowledge in computer science and mathematics.",
  },
];

const work = [
  {
    title: "Co-founder & Full-Stack Developer",
    date: "2024 – Present",
    org: "SeedLynx",
    icon: <FaSeedling />,
    color: "cyan",
    desc: "Co-founded an AgriTech and digital services startup. Lead the full-stack development of platforms — designing user-friendly interfaces and managing the infrastructure that keeps services running smoothly.",
  },
  {
    title: "Freelance Web Developer",
    date: "2024 – Present",
    org: "Independent",
    icon: <FaBriefcase />,
    color: "purple",
    desc: "Build custom web applications, booking systems, and landing pages for small businesses. Handle everything from UI/UX to deployment on Vercel and other cloud platforms.",
  },
  {
    title: "IT Infrastructure Trainee",
    date: "2024",
    org: "TESDA / Cisco NetAcad Practicum",
    icon: <FaUserTie />,
    color: "green",
    desc: "Hands-on training in computer systems servicing, structured cabling, switch/router configuration, and LAN/WAN deployment using Cisco IOS and Packet Tracer.",
  },
];

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="ctr">
        <div className="tag">About Me</div>
        <h2 className="sec-title">Who Am I?</h2>
        <p className="sec-sub">
          A passionate technologist with dual expertise in IT infrastructure and modern software development,
          committed to building scalable, reliable, and beautifully crafted digital experiences.
        </p>

        <div className={styles.grid}>
          {/* LEFT: Education + Work split */}
          <div className="rv">
            <div className={styles.tlLabel}>
              <FaTimeline /> Education
            </div>
            <div className={styles.timeline}>
              {education.map((it, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.head}>
                    <div className={styles.title}>{it.title}</div>
                    <div className={styles.date}>{it.date}</div>
                  </div>
                  <div className={styles.org}>
                    <span className={styles[`ico_${it.color}`]}>{it.icon}</span>
                    {it.org}
                  </div>
                  <div className={styles.desc}>{it.desc}</div>
                </div>
              ))}
            </div>

            <div className={`${styles.tlLabel} ${styles.tlLabelGap}`}>
              <FaBriefcase /> Work Experience
            </div>
            <div className={styles.timeline}>
              {work.map((it, i) => (
                <div key={i} className={styles.item}>
                  <div className={styles.head}>
                    <div className={styles.title}>{it.title}</div>
                    <div className={styles.date}>{it.date}</div>
                  </div>
                  <div className={styles.org}>
                    <span className={styles[`ico_${it.color}`]}>{it.icon}</span>
                    {it.org}
                  </div>
                  <div className={styles.desc}>{it.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Info cards */}
          <div className="rv d2">
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={`${styles.cardIco} ${styles.icoP}`}><FaSeedling /></div>
                <div>
                  <div className={styles.cardTitle}>Co-founder — SeedLynx</div>
                  <div className={styles.cardSub}>Startup · AgriTech & Digital Services</div>
                </div>
              </div>
              <div className={styles.cardBody}>
                As co-founder of <a href="https://seedlynx.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.link}>SeedLynx</a>, I help shape our vision by building digital solutions that help businesses streamline their operations and improve service efficiency. I lead full-stack development from designing user-friendly interfaces to managing the infrastructure that keeps our services running smoothly.
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={`${styles.cardIco} ${styles.icoC}`}><FaLightbulb /></div>
                <div>
                  <div className={styles.cardTitle}>My Approach</div>
                  <div className={styles.cardSub}>Philosophy &amp; Work Style</div>
                </div>
              </div>
              <div className={styles.cardBody}>
                Great software starts at the infrastructure level. My background in networking gives me a unique perspective on performance, security, and reliability — principles I carry into every line of code I write.
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={`${styles.cardIco} ${styles.icoB}`}><FaBullseye /></div>
                <div>
                  <div className={styles.cardTitle}>Currently Focused On</div>
                  <div className={styles.cardSub}>Goals &amp; Interests</div>
                </div>
              </div>
              <div className={styles.cardBody}>
                Deepening full-stack web development expertise, advancing network security knowledge, and exploring cloud infrastructure. Pushing SeedLynx toward production scale and experimenting with AI-powered tooling.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
