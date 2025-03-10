import { getDataFromFirebase } from "@/shared/services/utils";
import { BookType } from "@/shared/types/dataTypes";

// 검색 결과 가져오기
export const getSearchResults = async (query: string) => {
  try {
    const booksData = await getDataFromFirebase("books", true);
    const searchResult = booksData.filter((book: BookType) =>
      book.title.includes(query)
    );
    console.log(searchResult);
    return searchResult;
  } catch (error) {
    console.error("검색 결과 가져오기 에러", error);
    return [];
  }
}