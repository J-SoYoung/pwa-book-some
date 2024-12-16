import { useEffect } from "react";
import styles from "./login.module.css";
import { FcGoogle } from "react-icons/fc";
import { firebaseGoogleLogin } from "@/services/auth";

export const Login = () => {
  useEffect(() => {
    // recoil에 유저 데이터 있는지 확인
    // 있으면 로그아웃 버튼 view
  }, []);

  const onClickLogin = async () => {
    try {
      const googleLogin = await firebaseGoogleLogin();
      console.log(googleLogin);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoCircle}>
        <p>BOOKSOME</p>
        <img src="/" alt="logo" />
      </div>
      <div className={styles.loginButton} onClick={onClickLogin}>
        <FcGoogle className={styles.googleLogo} />
        <span>로그인</span>
      </div>
    </div>
  );
};
