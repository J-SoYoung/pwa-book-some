import { useEffect, useState } from "react";
import styles from "./detail.module.css";
import { DiarySection } from "./diarySection/DiarySection";
import { Link, useParams } from "react-router-dom";
import { BookType } from "@/services/types";
import { getBookAndDiaries } from "@/services/apis";

export type DiaryWidthPostsType = {
  diaryId: string;
  diaryCreatedAt: Date;
  diaryTitle: string;
  diaryImage: string;
  userId: string;
  postContent: string;
  postCreatedAt: Date;
  postTitle: string;
};
export interface DetailDataType {
  bookData: BookType;
  diaryWidthPosts: DiaryWidthPostsType[];
}

export const Detail = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [book, setBook] = useState<BookType | null>(null);
  const [diaries, setDiaries] = useState<DiaryWidthPostsType[] | []>([]);

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await getBookAndDiaries(bookId as string);
      console.log(response);
      if (response) {
        const { bookData, diaryWidthPosts }: DetailDataType = response;
        setBook(bookData);
        setDiaries(diaryWidthPosts);
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
            <p>{book?.title}</p>
            <Link
              to={book?.link as string}
              className={styles.bookLink}
              target="_blank" // 새 탭에서 열기
              rel="noopener noreferrer" // 보안 및 성능 향상을 위해 추가
            >
              구매하러가기
            </Link>
          </div>
          <img src={book?.image} alt={book?.title} className={styles.image} />
          <p className={styles.author}>{book?.author} </p>
          <p
            className={
              isExpanded ? `${styles.expanded}` : `${styles.description}`
            }
          >
            {book?.description}
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
