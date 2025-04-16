import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import styles from "../styles/header.module.css";

import { UserType } from "@/shared/types/dataTypes";
import { userState } from "@/shared/recoil/atoms";

export const Header = () => {
  const user = useRecoilValue<UserType | null>(userState);

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/home">BOOKSOME</Link>
      </h1>
      <nav className={styles.right}>
        <Link to={`/mypage/${user?.userId}`} className={styles.username}>
          {user ? `${user.username}님` : "환영합니다"}
        </Link>
        <Link to={`/mybook/${user?.userId}`} className={styles.button}>
          내서재
        </Link>
        <Link to={`/postsNew`} className={styles.button}>
          글쓰기
        </Link>
      </nav>
    </header>
  );
};
