import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { UserBookSkeleton, UserBooks, HomeContents } from "./components";
import { ItemsSkeleton } from "@/components/items";
import { ErrorFallback } from "@/components";

export const Home = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <h3>이 책을 추천합니다</h3>
      <Suspense fallback={<ItemsSkeleton />}>
        <HomeContents />
      </Suspense>
      <h3>다른 유저들은 이런 책을 읽고 있어요!</h3>
      <Suspense fallback={<UserBookSkeleton />}>
        <UserBooks />
      </Suspense>
    </ErrorBoundary>
  );
};
