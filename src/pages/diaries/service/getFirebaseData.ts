import { getDiaryData, getUserData } from "@/shared/apis/apis";
import { GetDiaryWithUserDataType } from "@/shared/types/functionTypes";

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


