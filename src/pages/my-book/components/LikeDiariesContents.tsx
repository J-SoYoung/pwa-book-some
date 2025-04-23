import { useRecoilValue } from "recoil";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ItemLists } from "./ItemLists";
import { getLikeDiaries } from "../service/getFirebaseData";

import { userState } from "@/shared/recoil/atoms";
import { UserType } from "@/shared/types/dataTypes";

export const LikeDiariesContents = ({ title }: { title: string }) => {
  const user = useRecoilValue(userState) as UserType;

  const { data: likeDiaries } = useSuspenseQuery({
    queryKey: ["likeDiaries", user.userId],
    queryFn: async () => {
      return await getLikeDiaries(user.userId as string);
    }
  });

  return (
    <section>
      {title && <h3>{title}</h3>}
      <ItemLists
        diaries={likeDiaries}
        noDataText="마음에 드는 다이어리에 하트를 눌러주세요!"
      />
    </section>
  );
};
