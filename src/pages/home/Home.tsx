import { useEffect, useState } from "react";
import styles from "./home.module.css";

import UserBooks from "./userBooks/UserBooks";

import { getRecommendBooks } from "@/services/apis";
import { BookType } from "@/services/types/dataTypes";
import { Items } from "@/components/items/Items";

export const Home = () => {
  const [recommendBooks, setRecommendBooks] = useState<BookType[] | []>([]);

  useEffect(() => {
    const fetchBookData = async () => {
      const bookData = await getRecommendBooks();
      if (bookData) setRecommendBooks(bookData);
    };
    fetchBookData();
  }, []);

  return (
    <main className={styles.home}>
      <section className={styles.section}>
        <h3>이 책을 추천합니다</h3>
        <div className={styles.itemListBox}>
          {recommendBooks.map((book) => {
            const data = {
              url: `/detail/${book.id}`,
              imageUrl: book.image,
              title: book.title
            };
            return <Items data={data} key={book.id} />;
          })}
        </div>
      </section>

      <h3>다른 유저들은 이런 책을 읽고 있어요!</h3>
      <UserBooks />
    </main>
  );
};
