import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styles from "./diaries.module.css";

import { DiaryItem } from "./components/DiaryItem";
import { PostLists } from "./components/PostLists";

import { userState } from "@/recoil/atoms";
import { getDiaryWithUserData } from "@/services/apis";

export const Diaries = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const user = useRecoilValue(userState);

  const {
    data: diary,
    isLoading,
    error
  } = useQuery({
    queryKey: ["diary", diaryId],
    queryFn: () => getDiaryWithUserData(diaryId as string),
    enabled: !!diaryId // diaryId가 존재할 때만 실행
  });
  const isAuthor = diary?.user.userId === user?.userId;

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <main className={styles.diariesContainer}>
      <h2>Diaries</h2>
      {diary && <DiaryItem diary={diary} isAuthor={isAuthor} />}
      <PostLists diaryId={diaryId as string} isAuthor={isAuthor} />
    </main>
  );
};
