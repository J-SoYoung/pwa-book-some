import { Suspense } from "react";
import styles from "./searchResults.module.css";

import { ErrorFallback } from "@/components";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SearchResultsContents } from "./SearchResultsContents";

export const Skeleton = () => {
  return (
    <div className={styles.loadingSpinner}>
      <AiOutlineLoading3Quarters />
    </div>
  );
};

export const SearchResults = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <h3>도서 검색결과</h3>
      <Suspense fallback={<Skeleton />}>
        <SearchResultsContents />
      </Suspense>
    </ErrorBoundary>
  );
};
