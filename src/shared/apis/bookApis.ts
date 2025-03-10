// export const searchBooks = async (query: string) => {
//   console.log("검색쿼리 api통신--", query);
//   try {
//     const response = await fetch(
//       `https://openapi.naver.com/v1/search/book?query=${encodeURI(query)}&display=10&start=1&sort=sim`,
//       // 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query);
//       {
//         method: "GET",
//         headers: {
//           "X-Naver-Client-Id": import.meta.env.VITE_APP_NAVER_CLIENT_ID,
//           "X-Naver-Client-Secret": import.meta.env.VITE_APP_NAVER_CLIENT_SECRET
//         }
//       }
//     );
//     console.log(response);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("데이터 검색결과", data.items);
//     return await data.items;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

export const searchBooks = async (query: string) => {
  const development = import.meta.env.DEV;
  console.log("개발환경", development);
  try {
    if (development) {
      // 개발 모드
      const response = await fetch(
        `/search/book?query=${encodeURI(query)}&display=10&start=1&sort=sim`,
        {
          method: "GET",
          headers: {
            "X-Naver-Client-Id": import.meta.env.VITE_APP_NAVER_CLIENT_ID,
            "X-Naver-Client-Secret": import.meta.env
              .VITE_APP_NAVER_CLIENT_SECRET
          }
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("데이터 검색결과", data.items);
      return await data.items;
    } else {
      // 프로덕션 모드
      const response = await fetch(
        `/api/searchBooks?query=${encodeURI(query)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    alert(error);
  }
};
