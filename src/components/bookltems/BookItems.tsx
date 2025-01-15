import { BookType, DiariesType } from "@/services/types";
import styles from "./bookltems.module.css";
import { Link } from "react-router-dom";

interface BooksProps {
  items: BookType[] | DiariesType[];
  types: "books" | "diaries";
}

export const BookItems = ({ items, types }: BooksProps) => {
  return (
    <div className={styles.bookCardBox}>
      {items.map((item) => {
        const linkTo =
          types === "books"
            ? `/detail/${(item as BookType).id}`
            : `/diaries/${(item as DiariesType).diaryId}`;

        const imgSrc =
          types === "books"
            ? (item as BookType).image
            : (item as DiariesType).bookImage;

        const title =
          types === "books"
            ? (item as BookType).title
            : (item as DiariesType).diaryTitle;

        const key =
          types === "books"
            ? (item as BookType).id
            : (item as DiariesType).bookId;

        return (
          <Link to={linkTo} key={key} className={styles.bookItem}>
            <img src={imgSrc} alt="book" />
            <h3>{title}</h3>
          </Link>
        );
      })}
    </div>
  );
};
