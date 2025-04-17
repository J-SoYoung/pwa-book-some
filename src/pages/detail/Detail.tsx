import { useParams } from "react-router-dom";

import { DiaryLists, BookContents, DetailPageSkeleton } from "./index";
import { WrapperSuspense } from "@/shared/components";

export const Detail = () => {
  const { bookIsbn } = useParams<{ bookIsbn: string }>();

  return (
    <>
      <WrapperSuspense title="Detail" fallback={<DetailPageSkeleton />}>
        <BookContents bookIsbn={bookIsbn as string} />
        <h3>같은 책을 읽으신 분들의 책장이에요!</h3>
        <DiaryLists bookIsbn={bookIsbn as string} />
      </WrapperSuspense>
    </>
  );
};
