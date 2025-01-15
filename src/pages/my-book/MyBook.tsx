import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import styles from "./mybook.module.css";

import { BookItems } from "@/components";

import { userState } from "@/recoil/atoms";
import { getMyBookData } from "@/services/apis";
import { DiariesType, UserType } from "@/services/types";

export const MyBook = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;
  const [readingBookDiaries, setReadingBookDiaries] = useState<DiariesType[]>(
    []
  );

  if (!user.userId) {
    alert("로그인 후 이용 가능합니다");
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      const myBookDiariesData = await getMyBookData(user.userId);
      if (myBookDiariesData) setReadingBookDiaries(myBookDiariesData);
    };
    fetchData();
  }, [user.userId]);

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
        <BookItems items={readingBookDiaries} types="diaries" />
      </section>
    </div>
  );
};
