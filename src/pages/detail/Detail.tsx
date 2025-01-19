import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { DiarySection } from "./diarySection/DiarySection";
import { Link, useParams } from "react-router-dom";
import { BookType, DiariesType, PostsType } from "@/services/types";
import { getBookAndDiaries } from "@/services/apis";

export type DiaryAndPostsType = DiariesType & { firstPost: PostsType };
export interface DetailDataType {
  book: BookType;
  diaries: DiaryAndPostsType[];
}

export const Detail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
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

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.bookSection}>
          <div className={styles.title}>
            <p>{bookData?.title}</p>
            <Link
              to={bookData?.link as string}
              className={styles.bookLink}
              target="_blank" // 새 탭에서 열기
              rel="noopener noreferrer" // 보안 및 성능 향상을 위해 추가
            >
              구매하러가기
            </Link>
          </div>
          <img
            src={bookData?.image}
            alt={bookData?.title}
            className={styles.image}
          />
          <p className={styles.author}>{bookData?.author} </p>
          <p
            className={
              isExpanded ? `${styles.expanded}` : `${styles.description}`
            }
          >
            {bookData?.description}
          </p>
          <button onClick={handleToggle}>
            {isExpanded ? "접기" : "더보기"}
          </button>
        </div>
        <DiarySection diaries={diaries} />
      </div>
    </>
  );
};
