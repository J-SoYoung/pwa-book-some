import { useLocation } from "react-router-dom";
import styles from "./searchResults.module.css";
import { useEffect, useState } from "react";
import { getSearchResults } from "@/services/apis";
import { BookItems } from "@/components";
import { searchBooks } from "@/bookApis/book";

export const SearchResults = () => {
  const location = useLocation();
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
    <div className={styles.container}>
      <h3 className={styles.title}>검색결과</h3>
      <div className={styles.searchResultsContent}>
        <p>
          다른 유저들이 읽은 <br />
          <b>'{query}'</b>의 검색결과는 <b>{searchResults.length}</b>건 입니다.
        </p>
        <div>
          <BookItems items={searchResults} types="books" />
        </div>
      </div>

      <div className={styles.searchMoreResults}>
        <p onClick={onClickMoreBooksSearch}>
          더 많은 도서 검색 결과를 원하시면 클릭하세요
        </p>
        {moreBookSearchData.length !== 0 && (
          <p>도서를 클릭하면 독서 다이어리를 생성할 수 있습니다 </p>
        )}
        <BookItems items={moreBookSearchData} types="searchResult" />
      </div>
    </div>
  );
};
