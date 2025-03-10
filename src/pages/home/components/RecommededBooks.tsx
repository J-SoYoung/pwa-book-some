import { useSuspenseQuery } from "@tanstack/react-query";
import styles from "../styles/recommededBooks.module.css";

import { Items } from "@/shared/components";
import { BookType } from "@/shared/types/dataTypes";
import { getRecommendBooks } from "@/shared/apis/apis";

export const RecommededBooks = () => {
  const { data: recommendBooks } = useSuspenseQuery({
    queryKey: ["recommendedBooks"],
    queryFn: getRecommendBooks
  });

  return (
    <main className={styles.home}>
      <section className={styles.section}>
        <div className={styles.itemListBox}>
          {recommendBooks?.map((book: BookType, idx) => {
            const data = {
              url: `/detail/${book.isbn}`,
              imageUrl: book.image,
              title: book.title
            };
            return <Items data={data} key={idx} />;
          })}
        </div>
      </section>
    </main>
  );
};
