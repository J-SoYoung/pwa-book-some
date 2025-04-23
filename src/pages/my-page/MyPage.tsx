import { useRef } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa6";

import styles from "./styles/mypage.module.css";

import { SectionHeader } from "@/shared/components";
import { userState } from "@/shared/recoil/atoms";
import { UserType } from "@/shared/types/dataTypes";
import { signOutFromGoogle } from "@/shared/apis/auth";

export const MyPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);
  const { username, email } = userData as UserType;
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const handleEditProfileImage = () => {
    fileInputRef.current?.click();
  };
  const editProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userData?.userId) return;
    // TODO: 이미지 업로드 API 호출, 클라우드 저장, 미리보기
  };

  return (
    <main className={styles.container}>
      <SectionHeader title="내 정보 관리" />
      <section className={styles.section}>
        <article>
          <div className={styles.profileImage}>
            <img src={userData?.avatar || ""} alt={username || "user"} />
            <FaPen
              size={20}
              className={styles.imageEditPen}
              onClick={handleEditProfileImage}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className={styles.editProfileImage}
            onChange={editProfileImage}
          />
        </article>

        <article className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <span className={styles.label}>username</span>
            <span className={styles.value}>{username}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>email</span>
            <span className={styles.value}>{email}</span>
          </div>
        </article>

        <button>수정하기</button>
        {userData && <button onClick={onClickLogout}>로그아웃</button>}
      </section>
    </main>
  );
};
