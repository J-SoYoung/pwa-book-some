// import { VercelRequest, VercelResponse } from "@vercel/node";

// const handler = async (req: VercelRequest, res: VercelResponse) => {
//   console.log("NAVER_CLIENT_ID:----", process.env.NAVER_CLIENT_ID);
//   console.log("NAVER_CLIENT_SECRET:----", process.env.NAVER_CLIENT_SECRET);
//   console.log("Serverless 함수 호출됨:----", req.query);

//   const { query, display = 10, start = 1, sort = "sim" } = req.query;

//   try {
//     const response = await fetch(
//       `https://openapi.naver.com/v1/search/book.json?query=${query}&display=${display}&start=${start}&sort=${sort}`,
//       {
//         headers: {
//           "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID || "",
//           "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET || ""
//         }
//       }
//     );

//     const data = await response.json();
//     console.log("네이버 API 응답 데이터--", data);

//     res.status(200).json(data); // `data.body`가 아닌 `data` 반환
//   } catch (error) {
//     console.error("Serverless 함수 에러:", error);
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// };

// export default handler;

import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { query } = req.query;
  console.log('vercel serverless 네이버호출 --',query);

  const apiUrl = `https://openapi.naver.com/v1/search/book?query=${encodeURI(
    query as string
  )}&display=10&start=1&sort=sim`;

  try {
    const headers: Record<string, string> = {
      "X-Naver-Client-Id": process.env.VITE_APP_NAVER_CLIENT_ID || "",
      "X-Naver-Client-Secret": process.env.VITE_APP_NAVER_CLIENT_SECRET || ""
    };

    if (!headers["X-Naver-Client-Id"] || !headers["X-Naver-Client-Secret"]) {
      throw new Error("Missing Naver API credentials");
    }
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    console.log('vercel Naver API 결과값 --- ',data.items)
    res.status(200).json(data.items);
  } catch (error) {
    console.error("Error fetching Naver API:", error);
    res.status(500).json({ error: "Failed to fetch Naver API" });
  }
}
