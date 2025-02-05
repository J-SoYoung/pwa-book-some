import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./bookSection.module.css";
import { getBookData } from "@/services/apis";
import { BookType } from "@/services/types/dataTypes";

export const BookSection = () => {
  const { bookIsbn } = useParams<{ bookIsbn: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [book, setBook] = useState<BookType | null>(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchBookData = async () => {
      const bookData = await getBookData(bookIsbn as string);
      if (bookData) {
        setBook(bookData);
      }
    };
    fetchBookData();
  }, [bookIsbn]);

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
