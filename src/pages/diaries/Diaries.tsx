import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styles from "./diaries.module.css";

import { DiaryItem } from "./components/DiaryItem";
import { PostLists } from "./components/PostLists";

import { userState } from "@/recoil/atoms";
import { getDiaryWithUserData } from "@/services/apis";
import { DiaryWithUserType } from "@/services/types/dataTypes";

export const Diaries = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const user = useRecoilValue(userState);
  const [isAuthor, setIsAuthor] = useState(false);
  const [diary, setDiary] = useState<DiaryWithUserType | null>(null);

  useEffect(() => {
    const fetchPosts = async (diaryId: string) => {
      try {
        const diaryWithUserData = await getDiaryWithUserData(diaryId);
        setDiary(diaryWithUserData);
      } catch (error) {
        console.error("다이어리 가져오기 에러", error);
      }
    };

    if (diary?.user.userId === user?.userId) setIsAuthor(true);

    fetchPosts(diaryId as string);
  }, [diaryId, user?.userId, diary?.user.userId]);

  return (
    <main className={styles.diariesContainer}>
      <h2>Diaries</h2>
      <DiaryItem diary={diary} setDiary={setDiary} isAuthor={isAuthor} />
      <PostLists diaryId={diaryId as string} isAuthor={isAuthor} />
    </main>
  );
};
