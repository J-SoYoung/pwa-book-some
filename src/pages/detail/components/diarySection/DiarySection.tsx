import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { DiarySkeleton } from "./DiarySkeleton";
import { DiaryContent } from "./DiaryContents";

import { ErrorFallback } from "@/components";

export const DiarySection = ({ bookIsbn }: { bookIsbn: string }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<DiarySkeleton />}>
        <DiaryContent bookIsbn={bookIsbn as string} />
      </Suspense>
    </ErrorBoundary>
  );
};
