import { Link, useParams } from "react-router-dom";
import styles from "./bookSection.module.css";
import { useEffect, useState } from "react";
import { getBookAndDiaries } from "@/services/apis";
import { DetailDataType } from "../Detail";
import { BookType } from "@/services/types";

export const BookSection = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [book, setBook] = useState<BookType | null>(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchBookData = async () => {
      const response = await getBookAndDiaries(bookId as string);
      if (response) {
        const { bookData }: DetailDataType = response;
        setBook(bookData);
      }
    };
    fetchBookData();
  }, [bookId]);
  return (
    <div className={styles.bookSection}>
      <div className={styles.title}>
        <p>{book?.title}</p>
        <Link
          to={book?.link as string}
          className={styles.bookLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          구매하러가기
        </Link>
      </div>
      <img src={book?.image} alt={book?.title} className={styles.image} />
      <p className={styles.author}>{book?.author} </p>
      <p
        className={isExpanded ? `${styles.expanded}` : `${styles.description}`}
      >
        {book?.description}
      </p>
      <button onClick={handleToggle}>{isExpanded ? "접기" : "더보기"}</button>
    </div>
  );
};
