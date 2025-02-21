import { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";


import { LikeDiariesContents, ReadingBookContents } from "./components";
import { userState } from "@/recoil/atoms";
import { UserType } from "@/services/types/dataTypes";
import { ErrorFallback } from "@/components";
import { ItemsSkeleton } from "@/components/items";

export const MyBook = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;

  if (!user.userId) {
    alert("로그인 후 이용 가능합니다");
    navigate("/login");
  }

  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <h3>읽고 있는 책</h3>
      <Suspense fallback={<ItemsSkeleton />}>
        <ReadingBookContents />
      </Suspense>

      <h3>좋아요 한 다이어리</h3>
      <Suspense fallback={<ItemsSkeleton />}>
        <LikeDiariesContents />
      </Suspense>
    </ErrorBoundary>
  );
};
