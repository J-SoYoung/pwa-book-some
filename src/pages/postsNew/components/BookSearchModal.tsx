import { useState } from "react";
import styles from "../styles/bookSearchModal.module.css";

import { searchBooks } from "@/shared/apis/bookApis";
import { SelectedBookType } from "@/shared/types/dataTypes";

export const BookSearchModal = ({
  onClose,
  onSelect
}: {
  onClose: () => void;
  onSelect: (book: SelectedBookType) => void;
}) => {
  const [bookSearchData, setBookSearchData] = useState<SelectedBookType[]>([]);
  const [bookQuery, setBookQuery] = useState("");

  const onClickSearchBook = async () => {
    const bookResult = await searchBooks(bookQuery);
    setBookSearchData(bookResult);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>도서 검색 결과</h3>
        <input
          type="text"
          placeholder="도서를 검색해주세요"
          value={bookQuery}
          onChange={(e) => setBookQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onClickSearchBook();
          }}
        />
        <button className={styles.searchIcon} onClick={onClickSearchBook}>
          🔍
        </button>
        {bookSearchData.length > 0 ? (
          <ul className={styles.bookList}>
            {bookSearchData.map((book) => (
              <li
                key={book.isbn}
                className={styles.bookItem}
                onClick={() => onSelect(book)}
              >
                <img src={book.image} />
                <div>
                  <strong>{book.title}</strong>
                  <p>{book.author}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>검색결과가 없습니다</p>
        )}
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};
