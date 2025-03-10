import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import styles from "../styles/navigation.module.css";
import PopupButton from "./PopupButton";

import { userState } from "@/shared/recoil/atoms";
import { signInFormGoogle, signOutFromGoogle } from "@/shared/apis/auth";

export const BottomNav = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useRecoilState(userState);

  const unKnownUser = () => {
    if (confirm("로그인이 필요합니다. 페이지를 이동하시겠습니까?")) {
      navigate("/login");
    }
  };
  const togglePopup = () => {
    if (userData === null) {
      unKnownUser();
    } else {
      setShowPopup(!showPopup);
    }
  };
  const moveMyBook = () => {
    if (userData === null) unKnownUser();
    else navigate(`/mybook/${userData.userId}`);
  };

  const onClickLogout = async () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      try {
        await signOutFromGoogle();
        setUserData(null);
        navigate("/login");
      } catch (error) {
        console.error("로그아웃 실패:", error);
      }
    }
  };

  const onClickLogin = async () => {
    try {
      const signInUser = await signInFormGoogle();
      setUserData(signInUser);
      navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
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

        {userData ? (
          <button onClick={onClickLogout}>로그아웃</button>
        ) : (
          <button onClick={onClickLogin}>로그인</button>
        )}
      </nav>
      {showPopup && <PopupButton onClose={togglePopup} />}
    </>
  );
};
