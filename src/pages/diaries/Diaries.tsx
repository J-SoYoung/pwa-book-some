import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styles from "./diaries.module.css";

import { DiaryItem } from "./components/DiaryItem";
import { PostLists } from "./components/PostLists";

import { getDiaryData } from "@/services/apis";
import { DiariesType } from "@/services/types/dataTypes";
import { userState } from "@/recoil/atoms";

export const Diaries = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const users = useRecoilValue(userState);
  const [isAuthor, setIsAuthor] = useState(false);
  const [diary, setDiary] = useState<DiariesType | null>(null);

  useEffect(() => {
    const fetchPosts = async (diaryId: string) => {
      try {
        const diaryData = await getDiaryData(diaryId);
        setDiary(diaryData);
      } catch (error) {
        console.error("다이어리 가져오기 에러", error);
      }
    };

    if (diary?.userId === users?.userId) setIsAuthor(true);

    fetchPosts(diaryId as string);
  }, [diaryId, users?.userId, diary?.userId]);

  return (
    <main className={styles.diariesContainer}>
      <h2>Diaries</h2>
      <DiaryItem diary={diary} setDiary={setDiary} isAuthor={isAuthor} />
      <PostLists diaryId={diaryId as string} isAuthor={isAuthor} />
    </main>
  );
};
