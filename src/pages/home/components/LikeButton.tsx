import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { GoHeartFill } from "react-icons/go";

import styles from "../styles/likeButton.module.css";
import { likeSubscribe, updateDiaryLikeState } from "../service/fetchLikeDiaries";

import { userState } from "@/shared/recoil/atoms";

export const LikeButton = ({ diaryId }: { diaryId: string }) => {
  const user = useRecoilValue(userState);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    const unsubscribe = likeSubscribe(
      diaryId,
      user?.userId as string,
      setIsLike
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [diaryId, user?.userId]);

  const handleToggleLike = async () => {
    if (!user?.userId) {
      console.error("유저가 로그인하지 않았습니다.");
      return;
    }

    await updateDiaryLikeState(isLike, diaryId, user.userId);
    setIsLike(!isLike);
  };

  return (
    <>
      {user && (
        <button onClick={handleToggleLike} className={styles.likeButton}>
          <GoHeartFill color={isLike ? "#f03e3e" : "#495057"} size={22} />
        </button>
      )}
    </>
  );
};
