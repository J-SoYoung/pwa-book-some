import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./searchResults.module.css";

import { Items } from "@/components";
import { getSearchResults } from "@/services/apis";
import { BookType } from "@/services/types";
import { searchBooks } from "@/bookApis/book";

export const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [searchResults, setSearchResults] = useState([]);
  const [moreBookSearchData, setMoreBookSearchData] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await getSearchResults(query as string);
      if (response) {
        setSearchResults(response);
      }
    };
    fetchSearchResults();
  }, [query]);

  const onClickMoreBooksSearch = async () => {
    try {
      const bookResult = await searchBooks(query as string);
      setMoreBookSearchData(bookResult);
    } catch (error) {
      console.error("검색결과가 없습니다", error);
    }
  };

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>검색결과</h3>
      <p className={styles.totalText}>
        다른 유저들이 읽은 <br />
        <b>'{query}'</b>의 검색결과는 <b>{searchResults.length}</b>건 입니다.
      </p>
      <div className={styles.itemListBox}>
        {searchResults.map((book: BookType) => {
          const data = {
            url: `/detail/${book.id}`,
            imageUrl: book.image,
            title: book.title
          };
          return <Items data={data} key={book.id} />;
        })}
      </div>

      <div className={styles.searchMoreResults}>
        <p onClick={onClickMoreBooksSearch}>
          더 많은 도서 검색 결과를 원하시면 클릭하세요
        </p>
        {moreBookSearchData.length !== 0 && (
          <p>도서를 클릭하면 독서 다이어리를 생성할 수 있습니다 </p>
        )}
        <div className={styles.bookCardBox}>
          {moreBookSearchData.map((item) => {
            const book = item as BookType;
            return (
              <div
                key={book.id}
                className={styles.bookItem}
                onClick={() => navigate("/postsNew", { state: { book } })}
              >
                <img src={book.image} alt="book" />
                <h3>{book.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
