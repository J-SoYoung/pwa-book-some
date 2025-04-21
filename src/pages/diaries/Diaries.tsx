import { DiaryPageSkeleton, DiaryContent } from "./index";
import { WrapperSuspense } from "@/shared/components";

export const Diaries = () => {
  return (
    <WrapperSuspense fallback={<DiaryPageSkeleton />}>
      <DiaryContent />
    </WrapperSuspense>
  );
};
