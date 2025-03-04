import { useSuspenseQuery } from "@tanstack/react-query";
import styles from "./recommededBooks.module.css";

import { Items } from "@/components";
import { BookType } from "@/services/types/dataTypes";
import { getRecommendBooks } from "@/services/apis";

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
            console.log(book)
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
