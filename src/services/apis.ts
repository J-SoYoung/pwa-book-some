// DEFAUT
// export const uploadDiaryPosting = async () => {
//   try {
//   } catch (error) {
//     console.error("uploadDiaryPosting 에러 --", error);
//   }
// };

import { get, push, ref, set } from "firebase/database";
import { database } from "./firebase";

export const uploadDiaryPosting = async (newDiaryData) => {
  try {
    const { books, diaries, posts, user } = newDiaryData;

    // 책 정보 저장
    const bookRef = ref(database, `books/${books.id}`);
    const bookSnapshot = await get(bookRef);
    if (!bookSnapshot.exists()) {
      await set(bookRef, {
        id: books.id,
        title: books.title,
        image: books.image,
        author: books.author,
        description: books.description,
        createdAt: books.createdAt,
        diaries: diaries.id
      });
    }

    // 다이어리 저장 (내가 저장한 id경로로 바로 저장)
    const diaryRef = ref(database, `diaries/${user.userId}/${diaries.id}`);
    await set(diaryRef, {
      bookId: books.id,
      title: diaries.title,
      createdAt: diaries.createdAt
    });

    // 포스트 저장
    const postsRef = ref(database, `posts/${diaries.id}/${posts.id}`);
    await set(postsRef, {
      title: posts.title,
      content: posts.content,
      createdAt: posts.createdAt
    });
  } catch (error) {
    console.error("uploadDiaryPosting 에러 --", error);
  }
};
