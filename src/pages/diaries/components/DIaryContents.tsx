import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";

import styles from "../diaries.module.css";
import { DiaryItem, PostLists, PostListsSkeleton } from "./index";

import { WrapperSuspense } from "@/components/WrapperSuspense";
import { getDiaryWithUserData } from "@/services/apis";

export const DiaryContents = () => {
  const { diaryId } = useParams<{ diaryId: string }>();
  const user = useRecoilValue(userState);

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
      <WrapperSuspense fallback={<PostListsSkeleton />}>
        <PostLists diaryId={diaryId as string} isAuthor={isAuthor} />
      </WrapperSuspense>
    </main>
  );
};
