import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import styles from "../styles/header.module.css";

import { UserType } from "@/shared/types/dataTypes";
import { userState } from "@/shared/recoil/atoms";
import PopupButton from "../../PopupButton";

export const Header = () => {
  const navigate = useNavigate();
  const user = useRecoilValue<UserType | null>(userState);
  const [showPopup, setShowPopup] = useState(false);

  const unKnownUser = () => {
    if (confirm("로그인이 필요합니다. 페이지를 이동하시겠습니까?")) {
      navigate("/login");
    }
  };

  const togglePopup = () => {
    if (!user) {
      unKnownUser();
    } else {
      setShowPopup(!showPopup);
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/home">BOOKSOME</Link>
      </h1>
      <nav className={styles.right}>
        <Link to={`/mypage/${user?.userId}`}>
          {user ? `${user.username}님` : "환영합니다"}
        </Link>
        <Link to={`/mybook/${user?.userId}`} className={styles.button}>
          내서재
        </Link>
        <button onClick={togglePopup} className={styles.button}>
          글쓰기
        </button>
      </nav>
      {showPopup && <PopupButton onClose={togglePopup} />}
    </header>
  );
};
