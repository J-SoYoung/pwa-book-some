import { Link } from "react-router-dom";
import styles from "./recommendations.module.css";
import { useEffect, useState } from "react";
import { getRandomBooks } from "@/services/apis";
import { BookType } from "@/services/types";

function Recommendations() {
  const [books, setBooks] = useState<BookType[] | []>([]);

  useEffect(() => {
    const fetchBookData = async () => {
      const bookData = await getRandomBooks();
      setBooks(bookData);
    };
    fetchBookData();
  }, []);
  console.log(books);
  return (
    <section className={styles.recommendations}>

      <div className={styles.bookGrid}>
        {books.map((book) => {
          return (
            <Link
              to={`/detail/${book.id}`}
              key={book.id}
              className={styles.bookItem}
            >
              <img src={book.image} alt="book" />
              <h3>{book.title}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Recommendations;
