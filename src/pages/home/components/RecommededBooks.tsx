import { useSuspenseQuery } from "@tanstack/react-query";

import styles from "../styles/recommededBooks.module.css";
import { getRecommendBooks } from "../service/getFirebaseData";

import { Items } from "@/shared/components";
import { BookType } from "@/shared/types/dataTypes";

export const RecommededBooks = () => {
  const { data: recommendBooks } = useSuspenseQuery({
    queryKey: ["recommendedBooks"],
    queryFn: getRecommendBooks
  });

  return (
    <section className={styles.itemListBox}>
      {recommendBooks?.map((book: BookType, idx) => {
        const data = {
          url: `/detail/${book.isbn}`,
          imageUrl: book.image,
          title: book.title
        };
        return <Items data={data} key={idx} />;
      })}
    </section>
  );
};
