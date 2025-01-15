import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import styles from "./mybook.module.css";
import { userState } from "@/recoil/atoms";
import { getMyBookData } from "@/services/apis";
import { DiariesType, UserType } from "@/services/types";
import { Link, useNavigate } from "react-router-dom";

export const MyBook = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;
  const [myBooksDiaries, setMyBooks] = useState<DiariesType[]>([]);

  if (!user.userId) {
    alert("로그인 후 이용 가능합니다");
    navigate("/login");
  }
  useEffect(() => {
    const fetchData = async () => {
      const myBookDiariesData = await getMyBookData(user.userId);
      setMyBooks(myBookDiariesData);
    };
    fetchData();
  }, [user.userId]);

  console.log(myBooksDiaries);
  return (
    <div className={styles.container}>
      <p>{user?.username}님 총 ()권의 책을 읽으셨네요!</p>
      <section className={styles.section}>
        <h3>읽고 싶은 책</h3>
        <div className={styles.example}>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={styles.exampleDiv}></div>
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <h3>읽고 있는 책</h3>
        <div className={styles.bookCardBox}>
          {myBooksDiaries.map((diary) => {
            console.log(diary);
            return (
              <Link
                to={`/diaries/${diary.diaryId}`}
                key={diary.bookId}
                className={styles.bookCard}
              >
                <img src={diary.bookImage} alt={diary.bookTitle} />
                <p>{diary.diaryTitle}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
