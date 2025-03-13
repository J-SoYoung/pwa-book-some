import { useSuspenseQuery } from "@tanstack/react-query";

import { DiaryItems } from "./DiaryItems";
import { getBookWithDiaryPost } from "../service/getFirebaseData";

export const DiaryLists = ({ bookIsbn }: { bookIsbn: string }) => {
  const { data: diaries } = useSuspenseQuery({
    queryKey: ["diaries", bookIsbn],
    queryFn: async () => {
      const data = await getBookWithDiaryPost(bookIsbn as string);
      return data;
    }
  });

  return (
    <>
      {diaries?.map((diaryData) => {
        const { diary, post, user } = diaryData;
        return (
          <DiaryItems
            key={diary.diaryId}
            diary={diary}
            post={post}
            user={user}
          />
        );
      })}
    </>
  );
};
