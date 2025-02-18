import { Link } from "react-router-dom";
import styles from "./diarySection.module.css";

import { getBookWithDiaryPost } from "@/services/apis";
import { useQueryErrorResetBoundary, useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components";
import { Suspense } from "react";

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


export const DiarySection = ({ bookIsbn }: { bookIsbn: string }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<DiarySkeleton />}>
        <DiaryContent bookIsbn={bookIsbn} />
      </Suspense>
    </ErrorBoundary>
  );
};
