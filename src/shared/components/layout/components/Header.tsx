import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FiSettings } from "react-icons/fi";

import styles from "../styles/header.module.css";

import { userState } from "@/shared/recoil/atoms";
import { UserType } from "@/shared/types/dataTypes";

export const Header = () => {
  const navigate = useNavigate();
  const user = useRecoilValue<UserType | null>(userState);

  return (
    <header className={styles.header}>
      <h1>
        <Link to={"/home"}>BOOKSOME</Link>
      </h1>
      <div>
        <span>{user ? `${user.username}님` : "환영합니다"}</span>
        {user && (
          <FiSettings
            size={15}
            onClick={() => {
              navigate(`/mypage/${user?.userId}`);
            }}
            className={styles.icon_setting}
          />
        )}
      </div>
    </header>
  );
};
