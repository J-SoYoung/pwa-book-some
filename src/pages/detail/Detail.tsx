import { useParams } from "react-router-dom";
import { DiaryContents, BookContents } from "./components";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { Skeleton } from "./components/Skeleton";
import { Suspense } from "react";

export const Detail = () => {
  const { bookIsbn } = useParams<{ bookIsbn: string }>();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense fallback={<Skeleton />}>
          <BookContents bookIsbn={bookIsbn as string} />
          <section>
            <h3>같은 책을 읽으신 분들의 책장이에요!</h3>
            <DiaryContents bookIsbn={bookIsbn as string} />
          </section>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
