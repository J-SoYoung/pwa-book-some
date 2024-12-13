import styles from "./popupButton.module.css";
import { Link } from "react-router-dom";

function PopupButton({ onClose }: { onClose: () => void }) {
  const handleLinkClick = () =>{
    onClose()
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
        <Link to={'/postsNew'} className={styles.diaryButton}  onClick={handleLinkClick}>새 다이어리 생성</Link>
        <Link to={'/posts'} className={styles.diaryButton}  onClick={handleLinkClick}>기존 다이어리 작성</Link>
      </div>
    </div>
  );
}

export default PopupButton;
