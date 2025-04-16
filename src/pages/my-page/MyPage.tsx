import { useRecoilState } from "recoil";
import styles from "./styles/mypage.module.css";
import { userState } from "@/shared/recoil/atoms";

import { MdArrowBackIosNew } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { UserType } from "@/shared/types/dataTypes";
import { signOutFromGoogle } from "@/shared/apis/auth";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);
  const { username, email } = userData as UserType;

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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <MdArrowBackIosNew size={20} className={styles.backButton} />
        <h2>내 정보 관리</h2>
      </header>
      <div className={styles.profileImageContainer}>
        <div className={styles.profileImage}>
          <img src={userData?.avatar || ""} alt="user.username" />
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
      {userData && <button onClick={onClickLogout}>로그아웃</button>}
    </div>
  );
};
