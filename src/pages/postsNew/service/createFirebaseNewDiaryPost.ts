import { database } from "@/shared/services/firebase";
import { NewDiaryDataType } from "@/shared/types/dataTypes";
import { get, ref, set, update } from "firebase/database";

// PostNew NEW 다이어리리 생성
export const createNewDiaryPost = async (newDiaryData: NewDiaryDataType) => {
  try {
    const { books, diaries, posts, user } = newDiaryData;

    // 책 정보 저장
    const bookRef = ref(database, `books/${books.isbn}`);
    const bookSnapshot = await get(bookRef);
    if (!bookSnapshot.exists()) {
      await set(bookRef, {
        isbn: books.isbn,
        title: books.title,
        image: books.image,
        author: books.author,
        description: books.description,
        diaries: { [diaries.diaryId]: true },
        link: books.link
      });
    } else {
      // 책은 존재한다면 다이어리 내용만 추가로 저장
      const bookData = bookSnapshot.val();
      const updatedDiaries = bookData.diaries || {};
      updatedDiaries[diaries.diaryId] = true;
      await update(bookRef, { diaries: updatedDiaries });
    }

    // 다이어리 저장 (내가 저장한 id경로로 바로 저장)
    const diaryRef = ref(database, `diary/${diaries.diaryId}`);
    await set(diaryRef, {
      book: {
        isbn: books.isbn,
        image: books.image,
        title: books.title
      },
      createdAt: diaries.createdAt,
      diaryId: diaries.diaryId,
      diaryTitle: diaries.diaryTitle,
      diaryImage: diaries.diaryImage,
      userId: user.userId,
      postId: { [posts.postId]: true }
    });

    // 포스트 저장
    const postsRef = ref(database, `posts/${posts.postId}`);
    await set(postsRef, {
      diaryId: diaries.diaryId,
      content: posts.content,
      createdAt: posts.createdAt,
      title: posts.title,
      postId: posts.postId
    });

    // user정보에 diaryId 함께 저장
    const userRef = ref(database, `users/${user.userId}/diaries`);
    await update(userRef, { [diaries.diaryId]: true });

    return "포스트가 정상적으로 업로드 되었습니다";
  } catch (error) {
    console.error("createNewDiaryPost 에러 --", error);
  }
};
