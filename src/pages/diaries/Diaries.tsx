import { DiaryPageSkeleton } from "./components";
import { DiaryContents } from "./components/DIaryContents";
import { WrapperSuspense } from "@/components/ErrorComp/WrapperSuspense";

export const Diaries = () => {
  return (
    <WrapperSuspense title="Diaries" fallback={<DiaryPageSkeleton />}>
      <DiaryContents />
    </WrapperSuspense>
  );
};
