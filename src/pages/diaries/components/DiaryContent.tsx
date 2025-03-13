import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/shared/recoil/atoms";

import styles from "../styles/diaries.module.css";
import { getDiaryWithUserData } from "../service/getFirebaseData";
import { DiaryItem, PostLists } from "../index";

import { UserType } from "@/shared/types/dataTypes";

export const DiaryContent = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const user = useRecoilValue(userState) as UserType;

  const { data: diary } = useSuspenseQuery({
    queryKey: ["diary", diaryId],
    queryFn: async () => {
      const data = await getDiaryWithUserData(diaryId as string);
      return data;
    }
  });

  const isAuthor = diary?.user.userId === user?.userId;

  return (
    <main className={styles.diariesContainer}>
      {diary && <DiaryItem diary={diary} isAuthor={isAuthor} />}
      <PostLists diaryId={diaryId as string} isAuthor={isAuthor} />
    </main>
  );
};
