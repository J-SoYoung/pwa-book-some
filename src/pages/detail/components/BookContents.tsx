import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import styles from "../styles/bookContents.module.css";
import { getOneBookData } from "../service/getFirebaseData";

export const BookContents = ({ bookIsbn }: { bookIsbn: string }) => {
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
    <section className={styles.bookSection}>
      <div className={styles.bookContainer}>
        <div className={styles.title}>
          <p>{book?.title}</p>
          <Link
            to={book?.link as string}
            target="_blank"
            rel="noopener noreferrer"
          >
            구매하러가기
          </Link>
        </div>
        <div className={styles.bookInfo}>
          <div className={styles.imageContainer}>
            <img src={book?.image} alt={book?.title} />
            <p>{book?.author} </p>
          </div>
          <p
            className={
              isExpanded ? `${styles.expanded}` : `${styles.description}`
            }
          >
            {book?.description}
          </p>
        </div>
        <button onClick={handleToggle}>{isExpanded ? "접기" : "더보기"}</button>
      </div>
    </section>
  );
};
