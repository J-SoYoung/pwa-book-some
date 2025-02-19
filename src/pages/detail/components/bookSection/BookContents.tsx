import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./_bookSection.module.css";
import { BookType } from "@/services/types/dataTypes";

export const BookContent = ({ book }: { book: BookType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

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
