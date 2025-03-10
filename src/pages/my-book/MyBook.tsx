import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { LikeDiariesContents, ReadingBookContents } from "./index";

import { userState } from "@/shared/recoil/atoms";
import { UserType } from "@/shared/types/dataTypes";
import { WrapperSuspense,ItemsSkeleton } from "@/shared/components";

export const MyBook = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;

  if (!user.userId) {
    alert("로그인 후 이용 가능합니다");
    navigate("/login");
  }

  return (
    <>
      <WrapperSuspense title="읽고 있는 책" fallback={<ItemsSkeleton />}>
        <ReadingBookContents />
      </WrapperSuspense>
      <WrapperSuspense title="좋아요 한 다이어리" fallback={<ItemsSkeleton />}>
        <LikeDiariesContents />
      </WrapperSuspense>
    </>
  );
};
