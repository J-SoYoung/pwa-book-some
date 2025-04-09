import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import styles from "../styles/userBooks.module.css";
import { getAllkDiaries } from "../service/getFirebaseData";
import { LikeButton } from "./LikeButton";

export const UserBooks = () => {
  const navigate = useNavigate();

  const { data: allDiaries } = useSuspenseQuery({
    queryKey: ["allDiaries"],
    queryFn: getAllkDiaries
  });

  return (
    <section className={styles.userBooks}>
      {allDiaries?.map((diaryData) => {
        const { book, diary, post, user } = diaryData;
        const scriptText = (html: string, length = 70) => {
          const tmp = document.createElement("div");
          tmp.innerHTML = html;
          const text = tmp.innerText;
          return text.length > length ? text.slice(0, length) + "..." : text;
        };

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
              <h3>{diary.diaryTitle.slice(0,17)}</h3>
              <p>{post.title}</p>
              <p>{scriptText(post.content)}</p>
              {/* <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content)
                }}
              /> */}
            </div>
          </div>
        );
      })}
    </section>
  );
};
