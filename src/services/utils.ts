import { get, ref } from "firebase/database";
import { database } from "./firebase";

// 배열을 랜덤하게 섞어주는 함수
export const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

// Firebase에서 데이터를 가져오는 함수
export const getDataFromFirebase = async (
  tableName: string,
  returnAsArray: boolean = false
) => {
  try {
    const dataRef = ref(database, tableName);
    const snapshot = await get(dataRef);

    if (snapshot.exists()) {
      const data = await snapshot.val();
      return returnAsArray ? Object.values(data) : data;
    } else {
      console.error(`No ${tableName} found.`);
      return returnAsArray ? [] : null;
    }
    
  } catch (error) {
    console.error(`${tableName} 가져오기 에러`, error);
    return returnAsArray ? [] : null;
  }
};

interface validatePostsNewFormType {
  diaryTitle: string;
  todayTitle: string;
  content: string;
}
export const validatePostsNewForm = (
  data: validatePostsNewFormType
): { valid: boolean; message: string } => {
  if (!data.diaryTitle || data.diaryTitle.length < 5) {
    return { valid: false, message: "다이어리 제목은 5자 이상이어야 합니다." };
  }
  if (!data.todayTitle || data.todayTitle.length < 5) {
    return { valid: false, message: "포스트트 제목은 5자 이상이어야 합니다." };
  }
  if (!data.content || data.content.length < 20) {
    return { valid: false, message: "포스트 내용은 20자 이상이어야 합니다." };
  }
  return { valid: true, message: "" };
};

interface validatePostsFormType {
  diaryId: string;
  title: string;
  content: string;
}
export const validatePostsForm = (
  data: validatePostsFormType
): { valid: boolean; message: string } => {
  console.log(data);
  if (!data.diaryId) {
    return {
      valid: false,
      message: "포스트를 작성할 다이어리를 선택해주세요."
    };
  }
  if (!data.title || data.title.length < 5) {
    return { valid: false, message: "포스트 제목은 5자 이상이어야 합니다." };
  }
  if (!data.content || data.content.length < 20) {
    return { valid: false, message: "포스트 내용은 20자 이상이어야 합니다." };
  }
  return { valid: true, message: "" };
};
