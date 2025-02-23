import { useParams } from "react-router-dom";

import { DiaryLists, BookContents, DetailPageSkeleton } from "./components";
import { WrapperSuspense } from "@/components/WrapperSuspense";

export const Detail = () => {
  const { bookIsbn } = useParams<{ bookIsbn: string }>();

  return (
    <>
      <WrapperSuspense fallback={<DetailPageSkeleton />}>
        <BookContents bookIsbn={bookIsbn as string} />
        <section>
          <h3>같은 책을 읽으신 분들의 책장이에요!</h3>
          <DiaryLists bookIsbn={bookIsbn as string} />
        </section>
      </WrapperSuspense>
    </>
  );
};
