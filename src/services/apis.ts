import { get, onValue, ref, remove, set, update } from "firebase/database";
import { database } from "./firebase";
import {
  BookType,
  DiariesType,
  DiariesWithPostsType,
  NewDiaryDataType,
  PostsType
} from "@/services/types";
import { getDataFromFirebase, shuffleArray } from "./utils";

// PostNew NEW 다이어리리 생성
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
      bookId: books.isbn,
      bookImage: books.image,
      bookTitle: books.title,
      createdAt: diaries.createdAt,
      diaryId: diaries.diaryId,
      diaryTitle: diaries.diaryTitle,
      userId: user.userId,
      postId: { [posts.id]: true }
    });

    // 포스트 저장
    const postsRef = ref(database, `posts-/${posts.id}`);
    await set(postsRef, {
      diaryId: diaries.diaryId,
      content: posts.content,
      createdAt: posts.createdAt,
      title: posts.title
    });

    // user정보에 diaryId 함께 저장
    const userRef = ref(database, `users/${user.userId}/diaries`);
    await update(userRef, { [diaries.diaryId]: true });

    return "포스트가 정상적으로 업로드 되었습니다";
  } catch (error) {
    console.error("createNewDiaryPost 에러 --", error);
  }
};

// Post 다이어리의 리스트 가져오기
export const getDiaryList = async (userId: string) => {
  try {
    // users > diaries
    const userDiaryRef = ref(database, `users/${userId}/diaries`);
    const userDiarySnapshot = await get(userDiaryRef);

    // diary가져오기
    if (userDiarySnapshot.exists()) {
      const diaryIds = Object.keys(userDiarySnapshot.val());
      const diaryPromise = diaryIds.map(async (diaryId) => {
        const diaryRef = ref(database, `diary/${diaryId}`);
        const diarySnapshot = await get(diaryRef);
        return diarySnapshot.exists() ? diarySnapshot.val() : null;
      });

      const diaries = await Promise.all(diaryPromise);
      return diaries.filter((diary) => diary !== null);
    } else {
      console.error("No diaries found.");
      return [];
    }
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
    // diary에 postId저장
    const diaryRef = ref(database, `diary/${diaryId}/postId`);
    await update(diaryRef, { [post.id]: true });

    // post저장
    const postsRef = ref(database, `posts-/${post.id}`);
    await set(postsRef, {
      content: post.content,
      createdAt: post.createdAt,
      diaryId: diaryId,
      title: post.title
    });
    return "포스트가 정상적으로 업로드 되었습니다";
  } catch (error) {
    console.error("uploadDiaryPost 에러 --", error);
  }
};

// HOME 모든 다이어리 가져오기
export const getAllBookDiaries = async () => {
  try {
    // 모든 다이어리 가져오기
    const diaryData = (await getDataFromFirebase(
      "diary",
      true
    )) as DiariesType[];

    // 포스트 데이터 가져오기
    const postsData = await Promise.all(
      diaryData.map(async (diary) => {
        if (diary.postId) {
          const postIds = Object.keys(diary.postId);
          const post = await getDataFromFirebase(`posts-/${postIds[0]}`, false);
          return post;
        }
        return null;
      })
    );

    // 다이어리와 포스트트 데이터 결합
    const diariesWithPosts = diaryData.map((diary): DiariesWithPostsType => {
      return {
        diaryId: diary.diaryId,
        diaryTitle: diary.diaryTitle,
        bookImage: diary.bookImage as string,
        bookTitle: diary.bookTitle as string,
        posts: postsData
      };
    });
    return diariesWithPosts;
  } catch (error) {
    console.error("다이어리 가져오기 에러", error);
    return [];
  }
};

// Diary 다이어리 포스트 가져오기
export const getDiaryPosts = async (diaryId: string) => {
  try {
    const diaryData = await getDataFromFirebase(`diary/${diaryId}`, false);
    const postsId = Object.keys(diaryData.postId);

    const postsData = await Promise.all(
      postsId.map(async (postId) => {
        if (postId) {
          const post = await getDataFromFirebase(`posts-/${postId}`, false);
          return post;
        }
        return null;
      })
    );
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
  try {
    // 책 가져오기
    const bookData = await getDataFromFirebase(`books/${bookId}`, false);
    if (!bookData) {
      console.error(
        `상세페이지 책 데이터 가져오기 에러, ${bookId}를 찾을 수 없습니다다`
      );
      return null;
    }

    // 다이어리 가져오기
    const diaryIds = Object.keys(bookData.diaries); // diaryIDs 가져오기
    const diaries = await Promise.all(
      diaryIds.map(async (diaryId) => {
        return await getDataFromFirebase(`diary/${diaryId}`, false);
      })
    );
    if (!diaries) {
      console.error(`상세페이지 다이어리 가져오기 에러`);
      return null;
    }

    // 다리어리 내부 포스트 가져오기 ( 첫번째 데이터만 )
    const diaryWidthPosts = await Promise.all(
      diaries.map(async (diary) => {
        const postFirstId = Object.keys(diary.postId);
        const post = await getDataFromFirebase(
          `posts-/${postFirstId[0]}`,
          false
        );

        const results = {
          diaryId: diary.diaryId,
          diaryCreatedAt: diary.createdAt,
          diaryTitle: diary.diaryTitle,
          diaryImage: diary.diaryImage,
          userId: diary.userId,
          postContent: post.content,
          postCreatedAt: post.createdAt,
          postTitle: post.title
        };
        return results;
      })
    );
    if (!diaryWidthPosts) {
      console.error("상세페이지 다이어리 내부 포스트 가져오기 에러");
      return null;
    
    }
    return { bookData, diaryWidthPosts: diaryWidthPosts };
  } catch (error) {
    console.error(error, "상세페이지 데이터 가져오기 에러");
  }
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

// 다이어리 좋아요
export const updateDiaryLikeState = async (
  likeState: boolean,
  diaryId: string,
  userId: string
) => {
  try {
    const likeRef = ref(database, `likes/${diaryId}/${userId}`);
    if (likeState) {
      await remove(likeRef);
      return false;
    } else {
      await set(likeRef, true);
      return true;
    }
  } catch (error) {
    console.error("좋아요 기능 에러", error);
    return false;
  }
};

export const likeSubscribe = (
  diaryId: string,
  userId: string,
  setLikes: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const likeRef = ref(database, `likes/${diaryId}/${userId}`);

  // 좋아요 상태 확인 ( 실시간 상태 확인 )
  const unsubscribe = onValue(likeRef, (snapshot) => {
    setLikes(snapshot.exists());
  });
  return unsubscribe;
};
