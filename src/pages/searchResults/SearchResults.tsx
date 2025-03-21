import { Suspense } from "react";

import { ErrorFallback, LoadingSpinner } from "@/shared/components";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { SearchResultsContents } from "./index";

export const SearchResults = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <h3>도서 검색결과</h3>
      <Suspense fallback={<LoadingSpinner />}>
        <SearchResultsContents />
      </Suspense>
    </ErrorBoundary>
  );
};
