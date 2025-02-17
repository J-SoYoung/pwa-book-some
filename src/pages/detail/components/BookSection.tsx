import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./bookSection.module.css";

import { getOneBookData } from "@/services/apis";
import { useCustomQueryhook } from "@/pages/home/useCustomQueryHooks";

const BookSkeleton = () => {
  return (
    <div className={styles.bookSkeleton}>
      <div className={styles.title}></div>
      <div className={styles.image} />
      <p className={styles.author}></p>
      <p className={styles.description}></p>
    </div>
  );
};

export const BookSection = ({ bookIsbn }: { bookIsbn: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const {
    data: book,
    SkeletonUI,
    errorMessage
  } = useCustomQueryhook({
    queryKey: ["book", bookIsbn],
    queryFn: async () => await getOneBookData(bookIsbn as string),
    SkeletonComponent: <BookSkeleton />,
    errorMessage: "도서 상세 페이지를 로드하는 데 실패했습니다."
  });

  return (
    <>
      {SkeletonUI ? (
        SkeletonUI
      ) : errorMessage ? (
        <p className={styles.errorText}>{errorMessage}</p>
      ) : (
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
      )}
    </>
  );
};
