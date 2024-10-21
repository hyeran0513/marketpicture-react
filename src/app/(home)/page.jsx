import styles from "./Home.module.scss";
import HomeClient from "./HomeClient";

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeClient />
    </div>
  );
}
