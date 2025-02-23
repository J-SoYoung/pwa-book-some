import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { FcGoogle } from "react-icons/fc";

import styles from "./login.module.css";
import { userState } from "@/recoil/atoms";
import { signInFormGoogle, signOutFromGoogle } from "@/services/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);

  const onClickGoogleSignIn = async () => {
    try {
      const signInUser = await signInFormGoogle();
      setUserData(signInUser);
      alert("로그인 성공 페이지 이동");
      navigate("/home");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };
  const onClickSignOut = async () => {
    if (confirm("정말 로그아웃 하시겠습니까?>")) {
      try {
        await signOutFromGoogle();
        setUserData(null);
        navigate("/login");
      } catch (error) {
        console.error("로그아웃 실패:", error);
      }
    }
  };

  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoCircle}>
        <p>BOOKSOME</p>
        <img src="/" alt="logo" />
      </div>
      {userData ? (
        <div className={styles.loginButton} onClick={onClickSignOut}>
          <FcGoogle className={styles.googleLogo} />
          <span>Sign Out</span>
        </div>
      ) : (
        <div className={styles.loginButton} onClick={onClickGoogleSignIn}>
          <FcGoogle className={styles.googleLogo} />
          <span>Sign In</span>
        </div>
      )}
      <Link to="/home" className={styles.moveHomeText}>Home 둘러보기</Link>
    </div>
  );
};
