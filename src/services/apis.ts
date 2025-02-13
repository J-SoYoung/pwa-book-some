import { get, onValue, ref, remove, set, update } from "firebase/database";
import { database } from "./firebase";
import {
  AllDiariesDataType,
  BookType,
  DiariesType,
  NewDiaryDataType,
  PostsType,
  UserType
} from "@/services/types/dataTypes";
import {
  getDataFromFirebase,
  getKeysFromFirebase,
  shuffleArray
} from "./utils";
import { newPostType } from "@/pages/diaries/components/PostItems";
import {
  GetAllDiariesType,
  GetOneBookDataType,
  getBookWithDiaryPostType,
  GetDiaryDataType,
  GetDiaryWithUserDataType,
  GetAllPostsDataType,
  GetUserDataType,
  GetRecommendBooksType,
  GetDiaryListType
} from "./types/functionTypes";

// basic data - book
export const getOneBookData: GetOneBookDataType = async (bookId) => {
  try {
    const bookData = await getDataFromFirebase(`books/${bookId}`, false);
    if (bookData) {
      return bookData;
    } else {
      console.error(`GetOneBookDataType에러, ${bookId}를 찾을 수 없습니다`);
      return null;
    }
  } catch (error) {
    console.error("Book정보 가져오기 에러", error);
    return null;
  }
};
// basic data - diary
export const getDiaryData: GetDiaryDataType = async (diaryId) => {
  try {
    const diary = await getDataFromFirebase(`diary/${diaryId}`, false);
    if (diary) {
      return diary as DiariesType;
    } else {
      console.error("다이어리가 없습니다");
      return null;
    }
  } catch (error) {
    console.log("getDiaryData 에러", error);
    return null;
  }
};
// basic data - posts
export const getAllPostsData: GetAllPostsDataType = async (diaryId) => {
  try {
    const diary = await getDiaryData(diaryId);
    if (diary === null) {
      return [];
    } else {
      const postIds = Object.keys(diary.postId);
      const posts = await Promise.all(
        postIds.map(async (id) => {
          return await getDataFromFirebase(`posts/${id}`);
        })
      );
      return posts;
    }
  } catch (error) {
    console.error("getAllPostsData 에러", error);
    return [];
  }
};
// basic data - user
export const getUserData: GetUserDataType = async (userId) => {
  try {
    const user = await getDataFromFirebase(`users/${userId}`, false);
    if (user) {
      return user;
    } else {
      console.error("유저 데이터가 없습니다");
      return null;
    }
  } catch (error) {
    console.error("getUserData 에러", error);
    return null;
  }
};

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

// Post 다이어리의 리스트 가져오기
export const getDiaryList: GetDiaryListType = async (userId) => {
  try {
    const userDiaryIds = await getKeysFromFirebase(`users/${userId}/diaries`);
    if (userDiaryIds.length === 0) {
      console.error("No diaries found.");
      return [];
    }
    const diaryData = await Promise.all(
      userDiaryIds.map(async (diaryId) => {
        return await getDiaryData(diaryId);
      })
    );
    return diaryData as DiariesType[];
  } catch (error) {
    console.error("getDiaryList 에러", error);
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
    await update(diaryRef, { [post.postId]: true });

    // post저장
    const postsRef = ref(database, `posts/${post.postId}`);
    await set(postsRef, {
      content: post.content,
      createdAt: post.createdAt,
      diaryId: diaryId,
      postId: post.postId,
      title: post.title
    });
    return "포스트가 정상적으로 업로드 되었습니다";
  } catch (error) {
    console.error("uploadDiaryPost 에러 --", error);
  }
};

// HOME 모든 다이어리 가져오기
export const getAllkDiaries: GetAllDiariesType = async () => {
  try {
    // 모든 다이어리 가져오기
    const diaryData: DiariesType[] = await getDataFromFirebase("diary", true);

    // 포스트 데이터 가져오기
    const postWithUserData = await Promise.all(
      diaryData.map(async (diary) => {
        const { book, diaryImage, diaryTitle, diaryId } = diary;
        if (!diary.postId) return null;

        const postId = Object.keys(diary.postId)[0];
        const postData = await getDataFromFirebase(`posts/${postId}`, false);
        const { content, title } = postData as PostsType;

        const userId = diary.userId;
        const userData = await getDataFromFirebase(`users/${userId}`);
        const { username, avatar } = userData as UserType;

        return {
          book: { image: book.image, title: book.title },
          diary: { diaryTitle, diaryImage, diaryId },
          post: { content, title, postId },
          user: { username, avatar, userId }
        };
      })
    );
    return postWithUserData.filter(
      (item): item is AllDiariesDataType => item !== null
    );
  } catch (error) {
    console.error("다이어리 가져오기 에러", error);
    return [];
  }
};

// Home 랜덤 책 데이터 가져오기 ( 캐러셀 구현 )
export const getRecommendBooks: GetRecommendBooksType = async () => {
  try {
    const booksData: BookType[] = await getDataFromFirebase("books", true);
    const randomBookData = shuffleArray(booksData).slice(0, 3);
    return randomBookData;
  } catch (error) {
    console.error("랜덤 책 가져오기 에러", error);
    return [];
  }
};

export const getBookWithDiaryPost: getBookWithDiaryPostType = async (
  bookId
) => {
  try {
    const diaryIds = await getKeysFromFirebase(`books/${bookId}/diaries`);
    const diaryWithPosts = await Promise.all(
      diaryIds.map(async (id) => {
        const diary = (await getDiaryData(id)) as DiariesType;
        const posts = await getAllPostsData(id);
        const firstPost = posts[0];
        const user = (await getUserData(diary.userId)) as UserType;

        return {
          diary: {
            diaryId: diary.diaryId,
            createdAt: diary.createdAt,
            diaryTitle: diary.diaryTitle,
            diaryImage: diary.diaryImage
          },
          post: {
            content: firstPost.content,
            createdAt: firstPost.createdAt,
            title: firstPost.title
          },
          user: {
            userId: user.userId,
            username: user.username,
            avatar: user.avatar
          }
        };
      })
    );
    return diaryWithPosts;
  } catch (error) {
    console.error("Book 다이어리 포스트 가져오기 에러", error);
    return [];
  }
};

export const getDiaryWithUserData: GetDiaryWithUserDataType = async (
  diaryId
) => {
  try {
    const diaryData = await getDiaryData(diaryId);
    if (!diaryData) return null;

    const userData = await getUserData(diaryData.userId);
    if (!userData) return null;

    const diaryWithUserData = {
      book: {
        isbn: diaryData.book.isbn ?? "",
        image: diaryData.book.image ?? "",
        title: diaryData.book.title ?? ""
      },
      diaryId: diaryData.diaryId,
      diaryImage: diaryData.diaryImage ?? "",
      diaryTitle: diaryData.diaryTitle ?? "",
      postId: diaryData.postId ?? {},
      user: {
        userId: userData?.userId ?? "",
        avatar: userData?.avatar ?? "",
        username: userData?.username ?? ""
      }
    };
    return diaryWithUserData;
  } catch (error) {
    console.error("getDiaryWidthUserData 에러", error);
    return null;
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

// 좋아요 실시간 확인
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

// MyBook 읽고 있는 책 다이어리 가져오기
export const getMyBookData = async (userId: string): Promise<DiariesType[]> => {
  try {
    const diaryIds = await getDataFromFirebase(
      `users/${userId}/diaries`,
      false
    );
    if (diaryIds) {
      const diaryIdsArray = Object.keys(diaryIds);
      const diaryList = await Promise.all(
        diaryIdsArray.map(async (diaryId) => {
          return await getDataFromFirebase(`diary/${diaryId}`, false);
        })
      );
      return diaryList as DiariesType[];
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

// my-book 좋아요 한 다이어리 가져오기기
export const getLikeDiaries = async (userId: string) => {
  try {
    const likesData: Record<
      string,
      Record<string, boolean>
    > = await getDataFromFirebase("likes", false);

    const likesDiaryIds = Object.keys(likesData);
    const likesDiariesData = likesDiaryIds.filter((diaryId: string) => {
      return likesData[diaryId][userId] === true;
    });

    if (likesDiariesData.length > 0) {
      const likeDiaries = await Promise.all(
        likesDiariesData.map(async (diaryId) => {
          return await getDataFromFirebase(`diary/${diaryId}`, false);
        })
      );
      return likeDiaries;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error, "좋아요 한 다이어리 가져오기 에러");
    return [];
  }
};

// 다이어리 수정
export const updateDiary = async ({
  diaryId,
  newTitle
}: {
  diaryId: string;
  newTitle: string;
}) => {
  try {
    const diaryRef = ref(database, `diary/${diaryId}`);
    const updates = { diaryTitle: newTitle };
    update(diaryRef, updates);
    return { diaryId, diaryTitle: newTitle };
  } catch (error) {
    console.error(error, "다이어리 제목 수정 에러");
    return {};
  }
};

// 포스트 수정
interface updatePostsType {
  editPost: newPostType;
  postId: string;
}
export const updatePosts = async ({ editPost, postId }: updatePostsType) => {
  try {
    const { title, content, updatedAt } = editPost;
    const postRef = ref(database, `posts/${postId}`);
    const updates = { content, title, updatedAt };
    update(postRef, updates);
    return { postId, title, content };
  } catch (error) {
    console.error(error, "포스트 수정 에러");
    return null;
  }
};
