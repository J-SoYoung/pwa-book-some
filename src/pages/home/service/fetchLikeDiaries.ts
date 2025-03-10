import { database } from "@/shared/services/firebase";
import { onValue, ref, remove, set } from "firebase/database";

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
  const unsubscribe = onValue(likeRef, (snapshot) => {
    setLikes(snapshot.exists());
  });
  return unsubscribe;
};