import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import styles from "./mybook.module.css";
import { ItemLists } from "./ItemLists";

import { userState } from "@/recoil/atoms";
import { getLikeDiaries, getMyBookData } from "@/services/apis";
import { UserType } from "@/services/types/dataTypes";
import { useQuery } from "@tanstack/react-query";

export const MyBook = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;

  if (!user.userId) {
    alert("로그인 후 이용 가능합니다");
    navigate("/login");
  }

  const {
    data: readingBookDiaries,
    isLoading: readingBookLoading,
    error: readingBookError
  } = useQuery({
    queryKey: ["readingBook", user.userId],
    queryFn: async () => {
      return await getMyBookData(user.userId as string);
    }
  });

  const {
    data: likeDiaries,
    isLoading: likeDiariesLoading,
    error: likeDiariesError
  } = useQuery({
    queryKey: ["likeDiaries", user.userId],
    queryFn: async () => {
      return await getLikeDiaries(user.userId as string);
    }
  });

  if (readingBookLoading || likeDiariesLoading) return <div>로딩중...</div>;
  if (readingBookError || likeDiariesError)
    return <div>에러가 발생했습니다</div>;
  if (readingBookDiaries === undefined || likeDiaries === undefined) return [];

  return (
    <div className={styles.container}>
      <p>
        {user?.username}님 총 {readingBookDiaries?.length}권의 책을 읽으셨네요!
      </p>
      <ItemLists
        sectionTitle="읽고 있는 책"
        diaries={readingBookDiaries}
        noDataText="읽을 책을 추가해주세요!"
      />
      <ItemLists
        sectionTitle="좋아요 한 다이어리리"
        diaries={likeDiaries}
        noDataText="마음에 드는 다이어리에 하트를 눌러주세요!"
      />
    </div>
  );
};
