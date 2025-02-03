import { DiarySection } from "./components/DiarySection";

import { BookType, DiaryWidthPostsType } from "@/services/types";
import { BookSection } from "./components/BookSection";

export interface DetailDataType {
  bookData: BookType;
  diaryWidthPosts: DiaryWidthPostsType[];
}

export const Detail = () => {
  return (
    <>
      <BookSection />
      <section>
        <h2>같은 책을 읽으신 분들의 책장이에요!</h2>
        <DiarySection />
      </section>
    </>
  );
};
