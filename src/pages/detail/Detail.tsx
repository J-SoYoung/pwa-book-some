import { useParams } from "react-router-dom";

import { DiaryLists, BookContents, DetailPageSkeleton } from "./index";
import { SectionHeader, WrapperSuspense } from "@/shared/components";

export const Detail = () => {
  const { bookIsbn } = useParams<{ bookIsbn: string }>();

  return (
    <main>
      <SectionHeader title="Detail" />
      <WrapperSuspense fallback={<DetailPageSkeleton />}>
        <BookContents bookIsbn={bookIsbn as string} />
        <DiaryLists
          bookIsbn={bookIsbn as string}
          title="같은 책을 읽으신 분들의 책장이에요"
        />
      </WrapperSuspense>
    </main>
  );
};
