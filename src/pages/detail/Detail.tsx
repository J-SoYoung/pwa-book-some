import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { DiarySection } from "./diarySection/DiarySection";
import { useParams } from "react-router-dom";
import { BookType, DiariesType, PostsType } from "@/services/types";
import { getBookAndDiaries } from "@/services/apis";

export type DiaryAndPostsType = DiariesType & { firstPost: PostsType };
export interface DetailDataType {
  book: BookType;
  diaries: DiaryAndPostsType[];
}

export const Detail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [bookData, setBookData] = useState<BookType | null>(null);
  const [diaries, setDiaries] = useState<DiaryAndPostsType[] | []>([]);

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await getBookAndDiaries(bookId as string);
      if (response) {
        const { book, diaries }: DetailDataType = response;
        setBookData(book);
        setDiaries(diaries);
      }
    };
    fetchBookData();
  }, [bookId]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.bookSection}>
          <p className={styles.title}>{bookData?.title}</p>
          <img
            src={bookData?.image}
            alt={bookData?.image}
            className={styles.image}
          />
          <p>{bookData?.author} </p>
          <p>{bookData?.description}</p>
        </div>
        <DiarySection diaries={diaries} />
      </div>
    </>
  );
};
