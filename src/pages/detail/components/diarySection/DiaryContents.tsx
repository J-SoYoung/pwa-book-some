import { Link } from "react-router-dom";

import styles from "./_diarySection.module.css";
import { DiaryWithPostsType } from "@/services/types/dataTypes";

export const DiaryContent = ({
  diaries
}: {
  diaries: DiaryWithPostsType[];
}) => {
  return (
    <>
      <div className={styles.diaryList}>
        {diaries?.map((diaryData) => {
          const { diary, post, user } = diaryData;
          return (
            <div key={diary.diaryId} className={styles.diary}>
              <div className={styles.imgBox}>
                <img src={user.avatar} />
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
        })}
      </div>
    </>
  );
};
