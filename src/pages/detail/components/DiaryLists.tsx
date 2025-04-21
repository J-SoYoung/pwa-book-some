import { useSuspenseQuery } from "@tanstack/react-query";

import styles from "../styles/diaryList.module.css";
import { DiaryItems } from "./DiaryItems";
import { getBookWithDiaryPost } from "../service/getFirebaseData";

export const DiaryLists = ({
  bookIsbn,
  title
}: {
  bookIsbn: string;
  title?: string;
}) => {
  const { data: diaries } = useSuspenseQuery({
    queryKey: ["diaries", bookIsbn],
    queryFn: async () => {
      const data = await getBookWithDiaryPost(bookIsbn as string);
      return data;
    }
  });

  return (
    <section>
      {title && <h3>{title}</h3>}
      <article className={styles.article}>
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
      </article>
    </section>
  );
};
