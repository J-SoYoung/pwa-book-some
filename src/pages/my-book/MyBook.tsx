import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { LikeDiariesContents, ReadingBookContents } from "./index";

import { userState } from "@/shared/recoil/atoms";
import { UserType } from "@/shared/types/dataTypes";
import { SectionHeader, WrapperSuspense } from "@/shared/components";
import { MyBookSkeleton } from "./components/MyBookSkeleton";

export const MyBook = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;

  if (!user.userId) {
    alert("로그인 후 이용 가능합니다");
    navigate("/login");
  }

  return (
    <main>
      <SectionHeader title="내서재" />
      <WrapperSuspense fallback={<MyBookSkeleton />}>
        <ReadingBookContents title="읽고 있는 책" />
        <LikeDiariesContents title="좋아요 한 다이어리" />
      </WrapperSuspense>
    </main>
  );
};
