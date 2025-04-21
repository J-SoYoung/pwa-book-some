import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { ErrorFallback } from "./ErrorFallback";

interface WrapperSuspenseProps {
  title?: string;
  fallback: ReactNode;
  children: ReactNode;
}
export const WrapperSuspense = ({
  title,
  fallback,
  children
}: WrapperSuspenseProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={fallback}>
        {title && <h3>{title}</h3>}
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
