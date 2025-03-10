import styles from "../styles/mypage.module.css";

export const InfoContainer = () => {
  return (
    <div className={styles.infoRow}>
      <span className={styles.label}>닉네임</span>
      <span className={styles.value}>나이키 매니아</span>
    </div>
  );
};
