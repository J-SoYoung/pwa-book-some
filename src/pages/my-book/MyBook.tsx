import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import styles from "./mybook.module.css";

import { BookItems } from "@/components";

import { userState } from "@/recoil/atoms";
import { getLikeDiaries, getMyBookData } from "@/services/apis";
import { DiariesType, UserType } from "@/services/types";

export const MyBook = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;
  const [readingBookDiaries, setReadingBookDiaries] = useState<DiariesType[]>(
    []
  );
  const [likeDiaries, setLikeDiaries] = useState<DiariesType[]>([]);

  if (!user.userId) {
    alert("로그인 후 이용 가능합니다");
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      const myBookDiariesData = await getMyBookData(user.userId);
      if (myBookDiariesData) setReadingBookDiaries(myBookDiariesData);
      const usersLikeDiary = await getLikeDiaries(user.userId);
      if (usersLikeDiary) {
        setLikeDiaries(usersLikeDiary);
      }
    };
    fetchData();
  }, [user.userId]);

  return (
    <div className={styles.container}>
      <p>
        {user?.username}님 총 {readingBookDiaries.length}권의 책을 읽으셨네요!
      </p>
      <section className={styles.section}>
        <h3>읽고 있는 책</h3>
        <BookItems items={readingBookDiaries} types="diaries" />
      </section>

      <section className={styles.section}>
        <h3>좋아요 한 다이어리리</h3>
        <div className={styles.example}>
          <BookItems items={likeDiaries} types="diaries" />
        </div>
      </section>
    </div>
  );
};
