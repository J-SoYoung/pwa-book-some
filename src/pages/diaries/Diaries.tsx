import { DiaryPageSkeleton, DiaryContents } from "./index";
import { WrapperSuspense } from "@/shared/components";

export const Diaries = () => {
  return (
    <WrapperSuspense title="Diaries" fallback={<DiaryPageSkeleton />}>
      <DiaryContents />
    </WrapperSuspense>
  );
};
