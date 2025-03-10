import { getDataFromFirebase, shuffleArray } from "@/shared/services/utils";
import { AllDiariesDataType, BookType, DiariesType, PostsType, UserType } from "@/shared/types/dataTypes";
import { GetAllDiariesType, GetRecommendBooksType } from "@/shared/types/functionTypes";

// Home 랜덤 책 데이터 가져오기 ( 캐러셀 구현 )
export const getRecommendBooks: GetRecommendBooksType = async () => {
  try {
    const booksData: BookType[] = await getDataFromFirebase("books", true);
    const randomBookData = shuffleArray(booksData).slice(0, 3);
    if (!randomBookData) throw Error("추천 책 데이터가 없습니다");
    return randomBookData;
  } catch (error) {
    console.error("추천 책 가져오기 에러", error);
    throw error;
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
    // postId가 없는 null 데이터를 제거 후 반환
    return postWithUserData.filter(
      (item): item is AllDiariesDataType => item !== null
    );
  } catch (error) {
    console.error("다이어리 가져오기 에러", error);
    throw error;
  }
};
