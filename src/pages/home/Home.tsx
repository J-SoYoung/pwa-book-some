import { useQuery } from "@tanstack/react-query";
import styles from "./home.module.css";
import UserBooks from "./components/UserBooks";

import { Items } from "@/components/items/Items";
import { getRecommendBooks } from "@/services/apis";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";
import { UserType } from "@/services/types/dataTypes";

export const Home = () => {
  const user = useRecoilValue(userState) as UserType;
  useEffect(() => {
    if (user.userId === "") {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
  });

  const { data: recommendBooks } = useQuery({
    queryKey: ["recommendedBooks"],
    queryFn: getRecommendBooks
  });

  return (
    <main className={styles.home}>
      <section className={styles.section}>
        <h3>이 책을 추천합니다</h3>
        <div className={styles.itemListBox}>
          {recommendBooks?.map((book) => {
            const data = {
              url: `/detail/${book.isbn}`,
              imageUrl: book.image,
              title: book.title
            };
            return <Items data={data} key={book.isbn} />;
          })}
        </div>
      </section>

      <h3>다른 유저들은 이런 책을 읽고 있어요!</h3>
      <UserBooks />
    </main>
  );
};
