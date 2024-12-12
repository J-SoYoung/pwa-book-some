import styles from "./popupButton.module.css";
import { Link } from "react-router-dom";

function PopupButton({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
        <Link to={'/postsNew'} className={styles.diaryButton}>새 다이어리 생성</Link>
        <Link to={'/posts'} className={styles.diaryButton}>기존 다이어리 작성</Link>
      </div>
    </div>
  );
}

export default PopupButton;
