import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { Skeleton } from "./components";
import { ErrorFallback } from "@/components";
import { DiaryContents } from "./components/DIaryContents";

export const Diaries = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<Skeleton />}>
        <DiaryContents />
      </Suspense>
    </ErrorBoundary>
  );
};
