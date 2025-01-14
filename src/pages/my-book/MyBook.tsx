import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import styles from "./mybook.module.css";
import { userState } from "@/recoil/atoms";
import { fetchMyBookData } from "@/services/apis";
import { DiariesType, UserType } from "@/services/types";
import { useNavigate } from "react-router-dom";

export const MyBook = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;
  const [myBooks, setMyBooks] = useState<DiariesType[]>([]);

  if (!user.userId) {
    alert("로그인 후 이용 가능합니다");
    navigate("/login");
  }
  useEffect(() => {
    const fetchData = async () => {
      const myBookData = await fetchMyBookData(user.userId);
      setMyBooks(myBookData);
    };
    fetchData();
  }, [user.userId]);

  console.log(myBooks);
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
          {myBooks.map((book) => {
            return (
              <div key={book.bookId} className={styles.bookCard}>
                <img src={book.bookImage} alt={book.bookTitle} />
                <p>{book.title}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
