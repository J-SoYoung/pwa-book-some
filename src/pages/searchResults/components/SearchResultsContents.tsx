import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../styles/searchResults.module.css";
import { searchBooks } from "@/shared/apis/bookApis";
import { getSearchResults } from "@/shared/apis/apis";
import { BookType } from "@/shared/types/dataTypes";
import { Items } from "@/shared/components";

export const SearchResultsContents = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [moreBookSearchData, setMoreBookSearchData] = useState([]);

  const { data: searchResults } = useSuspenseQuery({
    queryKey: ["searchResults", query],
    queryFn: () => getSearchResults(query as string)
  });

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
      <p className={styles.totalText}>
        다른 유저들이 읽은 <br />
        <b>'{query}'</b>의 검색결과는 <b>{searchResults.length}</b>건 입니다.
      </p>
      <div className={styles.itemListBox}>
        {searchResults.map((book: BookType) => {
          const data = {
            url: `/detail/${book.isbn}`,
            imageUrl: book.image,
            title: book.title
          };
          return <Items data={data} key={book.isbn} />;
        })}
      </div>

      <div className={styles.searchMoreResults}>
        <button
          className={styles.moreClickbutton}
          onClick={onClickMoreBooksSearch}
        >
          더 많은 도서 검색 결과를 원하시면 클릭하세요
        </button>
        {moreBookSearchData.length !== 0 && (
          <p>도서를 클릭하면 독서 다이어리를 생성할 수 있습니다 </p>
        )}
        <div className={styles.bookCardBox}>
          {moreBookSearchData.map((item) => {
            const book = item as BookType;
            return (
              <div
                key={book.isbn}
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
