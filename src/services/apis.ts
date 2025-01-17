import { get, ref, set, update } from "firebase/database";
import { database } from "./firebase";
import {
  BookType,
  DiariesType,
  DiariesWithPostsType,
  NewDiaryDataType,
  PostsType
} from "@/services/types";
import { getDataFromFirebase, shuffleArray } from "./utils";
import { DetailDataType } from "@/pages/detail/Detail";

// PostNew 다이어리 처음 생성
export const createNewDiaryPost = async (newDiaryData: NewDiaryDataType) => {
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
        diaries: { [diaries.diaryId]: true }
      });
    } else {
      // 책은 존재한다면 다이어리 내용만 추가로 저장
      const bookData = bookSnapshot.val();
      const updatedDiaries = bookData.diaries || {};
      updatedDiaries[diaries.diaryId] = true;
      await update(bookRef, { diaries: updatedDiaries });
    }

    // 다이어리 저장 (내가 저장한 id경로로 바로 저장)
    const diaryRef = ref(database, `diaries/${user.userId}/${diaries.diaryId}`);
    await set(diaryRef, {
      bookId: books.isbn,
      bookImage: books.image,
      bookTitle: books.title,
      diaryId: diaries.diaryId,
      diaryTitle: diaries.diaryTitle,
      createdAt: diaries.createdAt
    });

    // 포스트 저장
    const postsRef = ref(database, `posts/${diaries.diaryId}/${posts.id}`);
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

// Post 다이어리의 리스트 가져오기
export const getDiaryList = async (userId: string) => {
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
    console.error("getDiaryList 에러 --", error);
    return [];
  }
};

// Post 다이어리 포스트 생성
type NewPostData = {
  diaryId: string;
  post: PostsType;
};
export const createDiaryPost = async (newPostData: NewPostData) => {
  try {
    const { diaryId, post } = newPostData;
    const postsRef = ref(database, `posts/${diaryId}/${post.id}`);
    await set(postsRef, {
      title: post.title,
      content: post.content,
      createdAt: post.createdAt
    });
    return "포스트가 정상적으로 업로드 되었습니다";
  } catch (error) {
    console.error("uploadDiaryPost 에러 --", error);
  }
};

// HOME 모든 다이어리 가져오기
export const getAllBookDiaries = async () => {
  try {
    // 유저를 제외, 모든 다이어리 가져오기
    const diaryData = (await getDataFromFirebase(
      "diaries",
      true
    )) as DiariesType[];
    const allDiaries: DiariesType[] = diaryData.flatMap((userDiaries) =>
      Object.values(userDiaries as DiariesType)
    );

    // 포스트 데이터 가져오기
    const postsData = await getDataFromFirebase("posts", false);

    // 다이어리와 포스트트 데이터 결합
    const diariesWithPosts = allDiaries.map((diary): DiariesWithPostsType => {
      const diaryPosts = postsData[String(diary.diaryId)] || {};
      return {
        diaryId: diary.diaryId,
        diaryTitle: diary.diaryTitle,
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

export const diariesWithPosts = async () => {};

// 다이어리 포스트 가져오기
export const getDiaryPosts = async (diaryId: string) => {
  try {
    const postsData = await getDataFromFirebase(`posts/${diaryId}`, true);
    const diaries = await getDataFromFirebase(`diaries`, false);

    // 자신이 쓴 다이어리가 아니더라도 볼 수 있도록 다이어리 검색
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
export const getMyBookData = async (userId: string): Promise<DiariesType[]> => {
  try {
    const diaryData = await getDataFromFirebase(`diaries/${userId}`, true);
    return diaryData as DiariesType[];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Home 랜덤 책 데이터 가져오기
export const getRecommendBooks = async () => {
  try {
    const booksData = await getDataFromFirebase("books", true);
    const randomBookData = shuffleArray(booksData).slice(0, 3);
    return randomBookData as BookType[];
  } catch (error) {
    console.error("랜덤 책 가져오기 에러", error);
    return [];
  }
};

// Detail페이지 데이터 가져오기
export const getBookAndDiaries = async (bookId: string) => {
  // 책 가져오기
  const booksData = await getDataFromFirebase(`books/${bookId}`, false);
  if (!booksData) {
    console.error(`No book found with id: ${bookId}`);
    return null;
  }

  // 다이어리 가져오기
  const diaryIds = Object.keys(booksData.diaries); // diaryIDs 가져오기
  const diaryData = await getDataFromFirebase("diaries", true);
  const diaries = diaryData.flatMap((userDiaries: DiariesType) =>
    Object.values(userDiaries)
  );

  // 다리어리 내부 포스트 가져오기 ( 첫번째 데이터만 )
  const diaryWidthPosts = await Promise.all(
    diaries
      .filter((diary: DiariesType) => diaryIds.includes(diary.diaryId))
      .map(async (diary: DiariesType) => {
        const postList = await getDataFromFirebase(
          `posts/${diary.diaryId}`,
          true
        );
        const firstPost = postList.length > 0 ? postList[0] : null;
        return { ...diary, firstPost };
      })
  );
  return { book: booksData, diaries: diaryWidthPosts } as DetailDataType;
};

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
};
