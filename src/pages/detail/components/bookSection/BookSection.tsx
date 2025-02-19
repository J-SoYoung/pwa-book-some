import { Suspense } from "react";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { BookContent } from "./BookContents";
import { BookSkeleton } from "./BookSkeleton";
import { ErrorFallback } from "@/components";

export const BookSection = ({ bookIsbn }: { bookIsbn: string }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<BookSkeleton />}>
        <BookContent bookIsbn={bookIsbn as string} />
      </Suspense>
    </ErrorBoundary>
  );
};
