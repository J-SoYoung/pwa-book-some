import { Suspense } from "react";
import { useQueryErrorResetBoundary, useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { BookContent } from "./BookContents";
import { BookSkeleton } from "./BookSkeleton";
import { ErrorFallback } from "@/components";
import { getOneBookData } from "@/services/apis";
import { BookType } from "@/services/types/dataTypes";

export const BookSection = ({ bookIsbn }: { bookIsbn: string }) => {
  const { reset } = useQueryErrorResetBoundary();

  const { data: book } = useSuspenseQuery({
    queryKey: ["book", bookIsbn],
    queryFn: async () => {
      const data = await getOneBookData(bookIsbn as string);
      return data;
    }
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<BookSkeleton />}>
        <BookContent book={book as BookType} />
      </Suspense>
    </ErrorBoundary>
  );
};
