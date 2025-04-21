import { MdArrowBackIosNew } from "react-icons/md";
import styles from "./styles/sectionHeader.module.css";

export const SectionHeader = ({ title }: { title: string }) => {
  return (
    <header className={styles.header}>
      <MdArrowBackIosNew size={20} className={styles.backButton} />
      <h2>{title}</h2>
    </header>
  );
};
