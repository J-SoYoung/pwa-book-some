import { userState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";
import styles from "./header.module.css";
import { FiSettings } from "react-icons/fi";

import { UserType } from "@/services/types/dataTypes";
import { Link, useNavigate } from "react-router-dom";

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
