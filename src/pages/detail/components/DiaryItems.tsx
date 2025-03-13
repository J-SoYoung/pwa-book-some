import { Link } from "react-router-dom";

import styles from "../styles/diaryItems.module.css";
import { DiaryWithPostsType } from "@/shared/types/dataTypes";

export const DiaryItems = ({ diary, post, user }: DiaryWithPostsType) => {
  return (
    <div key={diary.diaryId} className={styles.diary}>
      <div className={styles.imgBox}>
        <img src={user.avatar} alt={user.username} />
        <Link to={`/diaries/${diary.diaryId}`}>
          {user.username}님<br />
          책장 구경가기
        </Link>
      </div>
      <div className={styles.contentBox}>
        <h3>{diary.diaryTitle}</h3>
        <p className={styles.subTitle}>{post.title}</p>
        <p className={styles.content}>{post.content}</p>
      </div>
    </div>
  );
};
