import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery
} from "@tanstack/react-query";

import { DiarySkeleton } from "./DiarySkeleton";
import { DiaryContent } from "./DiaryContents";

import { ErrorFallback } from "@/components";
import { getBookWithDiaryPost } from "@/services/apis";
import { DiaryWithPostsType } from "@/services/types/dataTypes";

export const DiarySection = ({ bookIsbn }: { bookIsbn: string }) => {
  const { reset } = useQueryErrorResetBoundary();
  const { data: diaries } = useSuspenseQuery({
    queryKey: ["diaries", bookIsbn],
    queryFn: async () => {
      const data = await getBookWithDiaryPost(bookIsbn as string);
      return data;
    }
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<DiarySkeleton />}>
        <DiaryContent diaries={diaries as DiaryWithPostsType[]} />
      </Suspense>
    </ErrorBoundary>
  );
};
