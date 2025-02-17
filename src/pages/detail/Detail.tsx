import { DiarySection } from "./components/DiarySection";
import { BookSection } from "./components/BookSection";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const { bookIsbn } = useParams<{ bookIsbn: string }>();

  return (
    <>
      <BookSection bookIsbn={bookIsbn as string} />
      <section>
        <h3>같은 책을 읽으신 분들의 책장이에요!</h3>
        <DiarySection bookIsbn={bookIsbn as string} />
      </section>
    </>
  );
};
