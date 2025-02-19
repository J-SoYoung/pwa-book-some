import { Link } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import styles from "./_diarySection.module.css";
import { getBookWithDiaryPost } from "@/services/apis";

export const DiaryContent = ({ bookIsbn }: { bookIsbn: string }) => {
  const { data: diaries } = useSuspenseQuery({
    queryKey: ["diaries", bookIsbn],
    queryFn: async () => {
      const data = await getBookWithDiaryPost(bookIsbn as string);
      return data;
    }
  });
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
