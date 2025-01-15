import { useEffect, useState } from "react";
import styles from "./home.module.css";

import { BookItems } from "@/components";
import UserBooks from "./userBooks/UserBooks";

import { getRecommendBooks } from "@/services/apis";
import { BookType } from "@/services/types";

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
      <h2>이 책을 추천합니다</h2>
      <section className={styles.recommendations}>
        <BookItems items={recommendBooks} types="books" />
      </section>

      <h2>다른 유저들은 이런 책을 읽고 있어요!</h2>
      <UserBooks />
    </main>
  );
};
