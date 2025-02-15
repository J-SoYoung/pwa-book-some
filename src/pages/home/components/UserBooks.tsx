import { useNavigate } from "react-router-dom";

import styles from "./userBooks.module.css";
import { UserBookSkeleton } from "./UserBookSkeleton";

import { getAllkDiaries } from "@/services/apis";
import { LikeButton } from "@/components/likeButton/LikeButton";
import { useCustomQueryhook } from "../useCustomQueryHooks";

function UserBooks() {
  const navigate = useNavigate();

  const {
    data: allDiaries,
    SkeletonUI,
    errorMessage
  } = useCustomQueryhook({
    queryKey: ["allDiaries"],
    queryFn: getAllkDiaries,
    SkeletonComponent: <UserBookSkeleton />,
    errorMessage: "유저 다이어리를 가져오는데 실패하였습니다."
  });

  return (
    <section className={styles.userBooks}>
      {SkeletonUI ? (
        SkeletonUI
      ) : errorMessage ? (
        <p className={styles.errorText}>{errorMessage}</p>
      ) : (
        allDiaries?.map((diaryData) => {
          const { book, diary, post, user } = diaryData;
          return (
            <div className={styles.bookCard} key={diary.diaryId}>
              <div className={styles.imageBox}>
                <img
                  className={styles.bookImage}
                  src={book.image}
                  alt={book.title}
                />
                <img
                  className={styles.userAvatar}
                  src={user.avatar}
                  alt={`${user.username}의 다이어리`}
                />
              </div>
              <div className={styles.likeBox}>
                <LikeButton diaryId={diary.diaryId} />
              </div>

              <div
                className={styles.bookInfo}
                onClick={() => {
                  navigate(`/diaries/${diary.diaryId}`);
                }}
              >
                <h3>{diary.diaryTitle}</h3>
                <p>{post.title}</p>
                <p>{post.content}</p>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}

export default UserBooks;
