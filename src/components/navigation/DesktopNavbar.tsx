import { useState } from "react";
import { Link } from "react-router-dom";

import PopupButton from "../popupButton/PopupButton";
import styles from "./navigation.module.css";

function DesktopNavbar() {
  // const navigate = useNavigate()
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
          <li>{/* <Link to={`/mybook/${user.userId}`}>내 서재</Link> */}</li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
        </ul>
      </nav>
      {showPopup && <PopupButton onClose={togglePopup} />}
    </>
  );
}

export default DesktopNavbar;
