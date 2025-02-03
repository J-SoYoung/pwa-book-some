import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import styles from "./mybook.module.css";
import { ItemLists } from "./ItemLists";

import { userState } from "@/recoil/atoms";
import { getLikeDiaries, getMyBookData } from "@/services/apis";
import { DiariesType, UserType } from "@/services/types/dataTypes";

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
      <ItemLists
        sectionTitle="읽고 있는 책"
        diaries={readingBookDiaries}
        noDataText="읽을 책을 추가해주세요!"
      />
      <ItemLists
        sectionTitle="좋아요 한 다이어리리"
        diaries={likeDiaries}
        noDataText="마음에 드는 다이어리에 하트를 눌러주세요!"
      />
    </div>
  );
};
