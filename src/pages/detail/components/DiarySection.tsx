import { Link } from "react-router-dom";
import styles from "./diarySection.module.css";

import { getBookWithDiaryPost } from "@/services/apis";
import { useCustomQueryhook } from "@/pages/home/useCustomQueryHooks";

const DiarySkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((_, index) => (
        <div key={index} className={styles.diarySkeleton}>
          <div className={styles.image}></div>
          <div className={styles.contentBox}>
            <p className={styles.subTitle}></p>
            <p className={styles.content}></p>
          </div>
        </div>
      ))}
    </>
  );
};

export const DiarySection = ({ bookIsbn }: { bookIsbn: string }) => {
  const {
    data: diaries,
    SkeletonUI,
    errorMessage
  } = useCustomQueryhook({
    queryKey: ["diaries", bookIsbn],
    queryFn: async () => await getBookWithDiaryPost(bookIsbn as string),
    SkeletonComponent: <DiarySkeleton />,
    errorMessage: "다이어리 데이터를 로드하는 데 실패했습니다."
  });

  return (
    <>
      {SkeletonUI ? (
        <DiarySkeleton />
      ) : errorMessage ? (
        <p className={styles.errorText}>{errorMessage}</p>
      ) : (
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
      )}
    </>
  );
};
