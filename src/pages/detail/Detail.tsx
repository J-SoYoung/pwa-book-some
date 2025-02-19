import { useParams } from "react-router-dom";
import { DiarySection, BookSection } from "./components";

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
