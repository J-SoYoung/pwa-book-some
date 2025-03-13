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
      <div className={styles.title}>
        <p>{book?.title}</p>
        <Link
          className={styles.bookLink}
          to={book?.link as string}
          target="_blank"
          rel="noopener noreferrer"
        >
          구매하러가기
        </Link>
      </div>
      <img className={styles.image} src={book?.image} alt={book?.title}  />
      <p className={styles.author}>{book?.author} </p>
      <p
        className={isExpanded ? `${styles.expanded}` : `${styles.description}`}
      >
        {book?.description}
      </p>
      <button onClick={handleToggle}>{isExpanded ? "접기" : "더보기"}</button>
    </section>
  );
};
