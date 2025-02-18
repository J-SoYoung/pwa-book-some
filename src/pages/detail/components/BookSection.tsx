import { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import styles from "./bookSection.module.css";
import { getOneBookData } from "@/services/apis";
import { ErrorFallback } from "@/components";

const BookSkeleton = () => {
  return (
    <div className={styles.bookSkeleton}>
      <div className={styles.title} />
      <div className={styles.image} />
      <p className={styles.author} />
      <p className={styles.description} />
    </div>
  );
};

export const BookContent = ({ bookIsbn }: { bookIsbn: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const { data: book } = useSuspenseQuery({
    queryKey: ["book", bookIsbn],
    queryFn: async () => {
      const data = await getOneBookData(bookIsbn as string);
      return data;
    }
  });

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

export const BookSection = ({ bookIsbn }: { bookIsbn: string }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<BookSkeleton />}>
        <BookContent bookIsbn={bookIsbn} />
      </Suspense>
    </ErrorBoundary>
  );
};
