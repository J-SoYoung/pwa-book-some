import { GoHeartFill } from "react-icons/go";
import "./likeButton.module,.css";
import { useEffect, useState } from "react";
import { likeSubscribe, updateDiaryLikeState } from "@/services/apis";
import { userState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";

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
    <button onClick={handleToggleLike}>
      <GoHeartFill color={isLike ? "#f03e3e" : "#495057"} size={22} />
    </button>
  );
};
