import { useRecoilValue } from "recoil";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ItemLists } from "./ItemLists";
import { getMyBookData } from "../service/getFirebaseData";

import { userState } from "@/shared/recoil/atoms";
import { UserType } from "@/shared/types/dataTypes";

export const ReadingBookContents = () => {
  const user = useRecoilValue(userState) as UserType;

  const { data: readingBookDiaries } = useSuspenseQuery({
    queryKey: ["readingBook", user.userId],
    queryFn: async () => {
      return await getMyBookData(user.userId as string);
    }
  });

  return (
    <>
      <p>
        {user?.username}님 총 {readingBookDiaries?.length}권의 책을 읽으셨네요!
      </p>
      <ItemLists
        diaries={readingBookDiaries}
        noDataText="읽을 책을 추가해주세요!"
      />
    </>
  );
};
