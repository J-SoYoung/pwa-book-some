import { useParams } from "react-router-dom";
import { DiaryItem } from "./DiaryItem";
import { PostLists } from "./PostLists";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";

import styles from "../diaries.module.css";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getDiaryWithUserData } from "@/services/apis";
import { Suspense } from "react";
import { DiaryItemSkeleton, PostListsSkeleton } from "./Skeleton";

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
      <h2>Diaries</h2>
      <Suspense fallback={<DiaryItemSkeleton />}>
        {diary && <DiaryItem diary={diary} isAuthor={isAuthor} />}
      </Suspense>
      <Suspense fallback={<PostListsSkeleton />}>
        <PostLists diaryId={diaryId as string} isAuthor={isAuthor} />
      </Suspense>
    </main>
  );
};
