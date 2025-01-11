// DEFAUT
// export const uploadDiaryPosting = async () => {
//   try {
//   } catch (error) {
//     console.error("uploadDiaryPosting 에러 --", error);
//   }
// };

import { get, ref, set, update } from "firebase/database";
import { database } from "./firebase";
import {
  DiariesType,
  DiariesWithPostsType,
  NewDiaryDataType,
  PostsType
} from "@/types";

// 다이어리 작성
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
      bookImage: books.image,
      bookTitle: books.title,
      id: diaries.id,
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
    return "포스트가 정상적으로 업로드 되었습니다";
  } catch (error) {
    console.error("uploadDiaryPosting 에러 --", error);
  }
};

// 다이어리 가져오기
export const getBookDiaries = async () => {
  try {
    // 전체 다이어리 가져오기기
    const diaryRef = ref(database, "diaries");
    const diarySnapshot = await get(diaryRef);
    if (!diarySnapshot.exists()) {
      console.error("No diaries found.");
      return [];
    }
    // 유저 기준이 아닌, 다이어리 기준으로 가져오기
    const diaryData = diarySnapshot.val();
    const allDiaries: DiariesType[] = Object.values(diaryData).flatMap(
      (userDiaries) => Object.values(userDiaries as DiariesType)
    );

    // 포스트 데이터 가져오기
    const postsRef = ref(database, "posts");
    const postsSnapshot = await get(postsRef);
    if (!postsSnapshot.exists()) {
      console.error("No posts found.");
      return [];
    }
    const postsData = postsSnapshot.val();

    // 다이어리와 포스트트 데이터 결합
    const diariesWithPosts = allDiaries.map((diary): DiariesWithPostsType => {
      const diaryPosts = postsData[String(diary.id)] || {};
      return {
        diaryId: diary.id,
        diaryTitle: diary.title,
        bookImage: diary.bookImage as string,
        bookTitle: diary.bookTitle as string,
        posts: Object.values(diaryPosts) as PostsType[]
      };
    });
    return diariesWithPosts;
  } catch (error) {
    console.error("다이어리 가져오기 에러", error);
    return [];
  }
};

export const getDiaryPosts = async (diaryId: string) => {
  try {
    const postsRef = ref(database, `posts/${diaryId}`);
    const postsSnapshot = await get(postsRef);
    if (!postsSnapshot.exists()) {
      console.error("No posts found.");
      return [];
    }
    const postsData = Object.values(postsSnapshot.val()) as PostsType[];

    const diaryRef = ref(database, "diaries");
    const diarySnapshot = await get(diaryRef);
    if (!diarySnapshot.exists()) {
      console.error("No diaries found.");
      return null;
    }
    const diaries = diarySnapshot.val();
    let diaryData: DiariesType | null = null;

    for (const userId in diaries) {
      const userDiaries = diaries[userId];
      if (userDiaries[diaryId]) {
        diaryData = userDiaries[diaryId] as DiariesType;
      }
    }
    return { postsData, diaryData };
  } catch (error) {
    console.error("포스트 가져오기 에러", error);
    return { postsData: [], diaryData: null };
  }
};

// MyBook 읽고 있는 책 데이터 가져오기
export const fetchMyBookData = async (
  userId: string
): Promise<DiariesType[]> => {
  try {
    const diaryRef = ref(database, `diaries/${userId}`);
    const diarySnapshot = await get(diaryRef);
    if (!diarySnapshot.exists()) {
      console.error("No diaries found.");
      return [];
    }
    const diaryData = Object.values(diarySnapshot.val());
    return diaryData as DiariesType[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
