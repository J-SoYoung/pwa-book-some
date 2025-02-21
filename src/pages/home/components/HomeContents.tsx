import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useSuspenseQuery } from "@tanstack/react-query";

import styles from "./homeContents.module.css";
import { Items } from "@/components";
import { userState } from "@/recoil/atoms";
import { BookType, UserType } from "@/services/types/dataTypes";
import { getRecommendBooks } from "@/services/apis";

export const HomeContents = () => {
  const user = useRecoilValue(userState) as UserType;
  useEffect(() => {
    if (user.userId === "") {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
  });

  const { data: recommendBooks } = useSuspenseQuery({
    queryKey: ["recommendedBooks"],
    queryFn: getRecommendBooks
  });

  return (
    <main className={styles.home}>
      <section className={styles.section}>
        <div className={styles.itemListBox}>
          {recommendBooks?.map((book: BookType) => {
            const data = {
              url: `/detail/${book.isbn}`,
              imageUrl: book.image,
              title: book.title
            };
            return <Items data={data} key={book.isbn} />;
          })}
        </div>
      </section>
    </main>
  );
};
