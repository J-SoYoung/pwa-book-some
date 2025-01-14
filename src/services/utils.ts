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

    if (!snapshot.exists()) {
      console.error(`No ${tableName} found.`);
      return returnAsArray ? [] : null;
    }
    const data = snapshot.val();
    return returnAsArray ? Object.values(data) : data;
  } catch (error) {
    console.error(`${tableName} 가져오기 에러`, error);
    return returnAsArray ? [] : null;
  }
};
