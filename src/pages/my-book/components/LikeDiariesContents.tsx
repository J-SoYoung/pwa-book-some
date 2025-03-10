import { useRecoilValue } from "recoil";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ItemLists } from "./ItemLists";
import { getLikeDiaries } from "../service/getFirebaseData";

import { userState } from "@/shared/recoil/atoms";
import { UserType } from "@/shared/types/dataTypes";

export const LikeDiariesContents = () => {
  const user = useRecoilValue(userState) as UserType;

  const { data: likeDiaries } = useSuspenseQuery({
    queryKey: ["likeDiaries", user.userId],
    queryFn: async () => {
      return await getLikeDiaries(user.userId as string);
    }
  });

  return (
    <ItemLists
      diaries={likeDiaries}
      noDataText="마음에 드는 다이어리에 하트를 눌러주세요!"
    />
  );
};
