import { useRecoilState } from "recoil";
import styles from "./mypage.module.css";
import { userState } from "@/recoil/atoms";

import { MdArrowBackIosNew } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { UserType } from "@/services/types";

export const MyPage = () => {
  const [user] = useRecoilState(userState);
  const { username, email} = user as UserType;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <MdArrowBackIosNew size={20} className={styles.backButton} />
        <h2>내 정보 관리</h2>
      </header>

      <div className={styles.profileImageContainer}>
        <div className={styles.profileImage}>
          <img src={user?.avatar || ""} alt="user.username" />
          <p className={styles.imageEditPen}>
            <FaPen size={20} />
          </p>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.infoRow}>
          <span className={styles.label}>username</span>
          <span className={styles.value}>{username}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>email</span>
          <span className={styles.value}>{email}</span>
        </div>
      </div>
      <button>수정하기</button>
    </div>
  );
};
