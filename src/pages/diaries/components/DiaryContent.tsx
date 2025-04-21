import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/shared/recoil/atoms";

import { getDiaryWithUserData } from "../service/getFirebaseData";
import { DiaryItem, PostLists } from "../index";

import { UserType } from "@/shared/types/dataTypes";
import { SectionHeader } from "@/shared/components";

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
    <main>
      <SectionHeader title='Diary'/>
      {diary && <DiaryItem diary={diary} isAuthor={isAuthor} />}
      <PostLists diaryId={diaryId as string} isAuthor={isAuthor} />
    </main>
  );
};
