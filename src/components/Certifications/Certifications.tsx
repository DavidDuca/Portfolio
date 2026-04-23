import { useState } from "react";
import { FaCertificate, FaShieldHalved, FaDownload, FaEye, FaXmark } from "react-icons/fa6";
import { SiCisco } from "react-icons/si";
import styles from "./Certifications.module.css";

interface Cert {
  title: string;
  issuer: string;
  pdf: string;
  badge: string;
  type: "tesda" | "cisco";
  skills: string[];
}

const certs: Cert[] = [
  {
    title: "Computer Systems Servicing NC II",
    issuer: "TESDA — Technical Education and Skills Development Authority",
    pdf: "/certificates/tesda-css-ncii.pdf",
    badge: "National Certificate Level II",
    type: "tesda",
    skills: ["PC Assembly & Disassembly", "Hardware Diagnostics", "OS Installation", "Structured Cabling", "Peripheral Configuration", "Network Setup", "Preventive Maintenance"],
  },
  {
    title: "Introduction to Networks (ITN)",
    issuer: "Cisco Networking Academy",
    pdf: "/certificates/cisco-itn.pdf",
    badge: "Cisco NetAcad — CCNA Module 1",
    type: "cisco",
    skills: ["TCP/IP Model", "OSI Model", "IPv4 & IPv6 Addressing", "Ethernet", "Subnetting", "Cisco IOS Basics", "Network Layer Protocols"],
  },
  {
    title: "Switching, Routing & Wireless Essentials (SRWE)",
    issuer: "Cisco Networking Academy",
    pdf: "/certificates/cisco-srwe.pdf",
    badge: "Cisco NetAcad — CCNA Module 2",
    type: "cisco",
    skills: ["VLANs & Trunking", "Inter-VLAN Routing", "STP", "EtherChannel", "DHCPv4 / DHCPv6", "Static & Dynamic Routing", "Wireless LAN Configuration", "WLAN Security"],
  },
  {
    title: "Enterprise Networking, Security & Automation (ENSA)",
    issuer: "Cisco Networking Academy",
    pdf: "/certificates/cisco-ensa.pdf",
    badge: "Cisco NetAcad — CCNA Module 3",
    type: "cisco",
    skills: ["OSPF (Single & Multi-area)", "ACLs", "NAT for IPv4", "WAN Concepts", "VPNs & IPsec", "Network Security Fundamentals", "QoS", "Network Automation & SDN"],
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    pdf: "/certificates/cisco-cybersec.pdf",
    badge: "Cisco NetAcad",
    type: "cisco",
    skills: ["Threat Landscape", "Attack Vectors", "Cryptography Basics", "Defense-in-Depth", "Security Best Practices", "Risk Management", "Incident Response Awareness"],
  },
  {
    title: "IT Essentials",
    issuer: "Cisco Networking Academy",
    pdf: "/certificates/cisco-itessentials.pdf",
    badge: "Cisco NetAcad",
    type: "cisco",
    skills: ["PC Hardware & Components", "Operating Systems", "Mobile Devices", "Printers", "Security Practices", "Troubleshooting Methodology", "IT Professional Soft Skills"],
  },
];

const Certifications = () => {
  const [preview, setPreview] = useState<Cert | null>(null);

  return (
    <section id="certifications" className={styles.certs}>
      <div className="ctr">
        <div className="tag">Credentials</div>
        <h2 className="sec-title">Certifications</h2>
        <p className="sec-sub">
          Recognized qualifications that formally validate my technical competencies
          in computer systems servicing and network infrastructure — covering the full Cisco CCNA track plus TESDA NC II.
        </p>

        <div className={styles.grid}>
          {certs.map((c, i) => (
            <div key={c.title} className={`${styles.card} rv ${i % 3 === 1 ? "d1" : i % 3 === 2 ? "d2" : ""}`}>
              <div className={styles.cardHead}>
                <div className={`${styles.ico} ${styles[`ico_${c.type}`]}`}>
                  {c.type === "tesda" ? <FaCertificate /> : <SiCisco />}
                </div>
                <span className={`${styles.badge} ${styles[`badge_${c.type}`]}`}>{c.badge}</span>
              </div>

              <div className={styles.title}>{c.title}</div>
              <div className={styles.issuer}>
                <FaShieldHalved /> {c.issuer}
              </div>

              {/* PDF Preview thumbnail */}
              <div className={styles.pdfThumb} onClick={() => setPreview(c)}>
                <iframe
                  src={`${c.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title={c.title}
                  className={styles.pdfFrame}
                />
                <div className={styles.pdfOverlay}>
                  <FaEye /> Click to preview
                </div>
              </div>

              <div className={styles.skillsLabel}>Skills Gained</div>
              <div className={styles.skills}>
                {c.skills.map((s) => (
                  <span key={s} className={`${styles.skill} ${styles[`skill_${c.type}`]}`}>{s}</span>
                ))}
              </div>

              <div className={styles.actions}>
                <button className={styles.btnPreview} onClick={() => setPreview(c)}>
                  <FaEye /> Preview
                </button>
                <a href={c.pdf} download className={styles.btnDownload}>
                  <FaDownload /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full preview modal */}
      {preview && (
        <div className={styles.previewBg} onClick={(e) => e.target === e.currentTarget && setPreview(null)}>
          <div className={styles.previewBox}>
            <div className={styles.previewHead}>
              <div>
                <div className={styles.previewTitle}>{preview.title}</div>
                <div className={styles.previewIssuer}>{preview.issuer}</div>
              </div>
              <div className={styles.previewActions}>
                <a href={preview.pdf} download className={styles.btnDownloadSm}>
                  <FaDownload /> Download
                </a>
                <button className={styles.x} onClick={() => setPreview(null)} aria-label="Close">
                  <FaXmark />
                </button>
              </div>
            </div>
            <iframe src={preview.pdf} title={preview.title} className={styles.previewFrame} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
