import { useEffect, useState } from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 1800);
    const t2 = setTimeout(() => setRemoved(true), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`${styles.loader} ${hidden ? styles.out : ""}`}>
      <div className={styles.eyebrow}>David Rupert Duca</div>
      <div className={styles.title}>
        Welcome to my <em>Portfolio</em>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} />
      </div>
      <div className={styles.dots}>
        <span /><span /><span />
      </div>
    </div>
  );
};

export default Loader;
