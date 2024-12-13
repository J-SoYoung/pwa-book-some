import { useState } from "react";
import PopupButton from "../popupButton/PopupButton";
import styles from "./navigation.module.css";
import { Link } from "react-router-dom";

function BottomNav() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <>
      <nav className={styles.bottomNav}>
        <Link to="/home" className={styles.bottomNavItems}>HOME</Link>
        <button onClick={togglePopup} className={styles.bottomNavItems}>+ 글쓰기</button>
        <Link to="/mybook" className={styles.bottomNavItems}>내 서재</Link>
      </nav>
      {showPopup && <PopupButton onClose={togglePopup} />}
    </>
  );
}

export default BottomNav;
