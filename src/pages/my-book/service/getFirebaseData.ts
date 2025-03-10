import { getDataFromFirebase } from "@/shared/services/utils";
import { DiariesType } from "@/shared/types/dataTypes";

// my-book 좋아요 한 다이어리 가져오기
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
