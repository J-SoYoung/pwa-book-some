import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";

import styles from "../styles/bottomNavbar.module.css";

import { userState } from "@/shared/recoil/atoms";
import PopupButton from "@/shared/components/PopupButton";

export const BottomNavbar = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const userData = useRecoilValue(userState);

  const unKnownUser = () => {
    if (confirm("로그인이 필요합니다. 페이지를 이동하시겠습니까?")) {
      navigate("/login");
    }
  };

  const moveMyBook = () => {
    if (!userData) unKnownUser();
    else navigate(`/mybook/${userData?.userId}`);
  };

  const togglePopup = () => {
    if (!userData) {
      unKnownUser();
    } else {
      setShowPopup(!showPopup);
    }
  };

  return (
    <>
      <nav className={styles.bottom__navbar}>
        <Link to="/home" className={styles.bottomNavItems}>
          HOME
        </Link>
        <Link to="/search" className={styles.bottomNavItems}>
        SEARCH
        </Link>
        <button onClick={moveMyBook} className={styles.bottomNavItems}>
          MYBOOK
        </button>
        <button onClick={togglePopup} className={styles.bottomNavItems}>
          + WRITE
        </button>
      </nav>
      {showPopup && <PopupButton onClose={togglePopup} />}
    </>
  );
};
