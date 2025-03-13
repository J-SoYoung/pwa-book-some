import { useState } from "react";
import { IoBookOutline } from "react-icons/io5";

import styles from "../styles/diaries.module.css";

import { DiaryWithUserType, UserType } from "@/shared/types/dataTypes";
import { DiaryEditView } from "./DiaryEditView";

interface DiaryPropsType {
  diary: DiaryWithUserType ;
  isAuthor: boolean;
  user: UserType;
}

export const DiaryItem = ({ diary, isAuthor, user }: DiaryPropsType) => {
  const [isEditDiary, setIsEditDiary] = useState(false);
  const handleDiaryEdit = () => {
    setIsEditDiary(!isEditDiary);
  };

  return (
    <section className={styles.diaryContainer}>
      <div className={styles.diaryTitleView}>
        {!isEditDiary ? (
          <>
            <h3>{diary?.diaryTitle}</h3>
            {isAuthor && <button onClick={handleDiaryEdit}>수정</button>}
          </>
        ) : (
          <DiaryEditView
            setIsEditDiary={setIsEditDiary}
            isEditDiary={isEditDiary}
            diary={diary}
          />
        )}
      </div>

      <div className={styles.diaryUserInfo}>
        <img src={user.avatar} alt={user.username} />
        <p>{user.username}</p>
      </div>

      <div className={styles.diaryImageView}>
        {diary?.diaryImage ? (
          <img src={diary?.diaryImage} className={styles.bgDiaryImage} />
        ) : (
          <IoBookOutline size={200} className={styles.diaryImageNull} />
        )}
      </div>

      <div className={styles.diaries}>
        <img
          src={diary?.book.image}
          className={styles.bookImage}
          alt="책 표지"
        />
        <div className={styles.diariesText}>
          <div>
            <span className={styles.label}>책</span>
            <p className={styles.featuredTitle}>{diary?.book.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
