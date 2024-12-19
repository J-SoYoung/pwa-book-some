// DEFAUT
// export const uploadDiaryPosting = async () => {
//   try {
//   } catch (error) {
//     console.error("uploadDiaryPosting 에러 --", error);
//   }
// };

import { get, ref, set, update } from "firebase/database";
import { database } from "./firebase";
import { NewDiaryDataType } from "@/types";

export const uploadDiaryPosting = async (newDiaryData: NewDiaryDataType) => {
  try {
    const { books, diaries, posts, user } = newDiaryData;

    // 책 정보 저장
    const bookRef = ref(database, `books/${books.isbn}`);
    const bookSnapshot = await get(bookRef);
    if (!bookSnapshot.exists()) {
      await set(bookRef, {
        id: books.isbn,
        title: books.title,
        image: books.image,
        author: books.author,
        description: books.description,
        diaries: { [diaries.id]: true }
      });
    } else {
      // 책은 존재한다면 다이어리 내용만 추가로 저장
      const bookData = bookSnapshot.val();
      const updatedDiaries = bookData.diaries || {};
      updatedDiaries[diaries.id] = true;
      await update(bookRef, { diaries: updatedDiaries });
    }

    // 다이어리 저장 (내가 저장한 id경로로 바로 저장)
    const diaryRef = ref(database, `diaries/${user.userId}/${diaries.id}`);
    await set(diaryRef, {
      bookId: books.isbn,
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
