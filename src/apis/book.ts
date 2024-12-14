export const searchBooks = async () => {
  try {
    const response = await fetch(
      "/search/book?query=주식&display=10&start=1&sort=sim",
      // "https://openapi.naver.com/v1/search/book.json?query=주식&display=10&start=1&sort=sim",
      // 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query);
      {
        method: "GET",
        headers: {
          "X-Naver-Client-Id": import.meta.env.VITE_APP_NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": import.meta.env.VITE_APP_NAVER_CLIENT_SECRET
        }
      }
    );
    if (!response.ok) throw new Error("HTTP에러");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const vercerSearchBooks = async () => {
  try {
    const response = await fetch(
      "/api/search?query=주식&display=10&start=1&sort=sim"
    );
    if (!response.ok) throw new Error("HTTP에러");
    // const data = await response.json();
    console.log("이거된건가?", response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
