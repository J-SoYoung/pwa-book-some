import styles from "./login.module.css";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoCircle}>
        <p>BOOKSOME</p>
        <img src="/" alt="logo" />
      </div>
      <div className={styles.loginButton}>
        <FcGoogle className={styles.googleLogo}/>
      </div>
    </div>
  );
};
