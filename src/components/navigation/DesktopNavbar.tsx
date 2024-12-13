import { useState } from "react";
import PopupButton from "../popupButton/PopupButton";
import styles from "./navigation.module.css";
import { Link } from "react-router-dom";

function DesktopNavbar() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <>
      <nav className={styles.desktopNavbar}>
        <div className={styles.logo}>BOOKSOME</div>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/home">HOME</Link>
          </li>
          <li>
            <button onClick={togglePopup}>글쓰기</button>
          </li>
          <li>
            <Link to="/mybook">내 서재</Link>
          </li>
        </ul>
      </nav>
      {showPopup && <PopupButton onClose={togglePopup} />}
    </>
  );
}

export default DesktopNavbar;
