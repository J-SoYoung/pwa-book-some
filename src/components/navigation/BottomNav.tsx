import { useState } from "react";
import PopupButton from "../popupButton/PopupButton";
import styles from "./navigation.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserType } from "@/services/types";
import { userState } from "@/recoil/atoms";

function BottomNav() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const user = useRecoilValue(userState) as UserType;

  const unKnownUser = () => {
    if (confirm("로그인이 필요합니다. 페이지를 이동하시겠습니까?")) {
      navigate("/login");
    }
  };
  const togglePopup = () => {
    console.log(user);
    if (user == null) {
      unKnownUser();
    } else {
      setShowPopup(!showPopup);
    }
  };
  const moveMyBook = () => {
    if (user == null) unKnownUser();
    else navigate(`/mybook/${user.userId}`);
  };

  return (
    <>
      <nav className={styles.bottomNav}>
        <Link to="/home" className={styles.bottomNavItems}>
          HOME
        </Link>
        <button onClick={togglePopup} className={styles.bottomNavItems}>
          + 글쓰기
        </button>
        <button onClick={moveMyBook} className={styles.bottomNavItems}>
          내 서재
        </button>

        <Link to="/login" className={styles.bottomNavItems}>
          로그인
        </Link>
      </nav>
      {showPopup && <PopupButton onClose={togglePopup} />}
    </>
  );
}

export default BottomNav;
