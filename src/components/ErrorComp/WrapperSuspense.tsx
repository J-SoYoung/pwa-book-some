import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

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
      {title && <h3>{title}</h3>}
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};
