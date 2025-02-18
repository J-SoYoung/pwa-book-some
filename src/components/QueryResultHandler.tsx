import { ReactNode } from "react";

interface QueryResultHandlerProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  SkeletonComponent?: ReactNode;
  children: ReactNode;
}

export const QueryResultHandler = ({
  isLoading,
  isError,
  errorMessage,
  SkeletonComponent,
  children
}: QueryResultHandlerProps) => {
  if (isLoading) return SkeletonComponent || <p>Loading...</p>;
  if (isError)
    return (
      <p className="error">
        {errorMessage || "데이터를 불러오는데 실패했습니다."}
      </p>
    );
  return <>{children}</>;
};
