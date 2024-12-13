import { Link } from "react-router-dom";
import styles from "./detail.module.css";

const books = {
  image: "url_to_image",
  title: "Book Title 1",
  author: "작가명",
  description:
    "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.",
  readers: ["userId1"]
};

export const Detail = () => {
  return (
    <>

    <div className={styles.container}>
      <div className={styles.bookSection}>
        <p className={styles.title}>{books.title}</p>
        <img src={books.image} alt={books.image} className={styles.image} />
        <p>{books.author} </p>
        <p>{books.description}</p>
      </div>

      <section className={styles.recommendationSection}>
        <h2>같은 책을 읽으신 분들의 책장이에요!</h2>
        <div className={styles.recommendationList}>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={styles.recommendationCard}>
                <div className={styles.imgBox}>
                  <img src="/"/>
                  <Link to={"/mybook"}>책장 구경가기</Link>
                </div>
                <div className={styles.cardContent}>
                  <h3>
                    나만의 책제목 여기에 들어감
                  </h3>
                  <p>
                    첫번째 게시글이 여기에 보여집니다. 어쩌면, 관련된 DB를
                    쓰는게 낫지 않을까 생각해봅니다. 낫지 않을까 생각해봅니다.
                    생각해봅니다 생각해봅니다.
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
    </>
  );
};

/**
 * 유저 아바타
 * 유저 다이어리 제목
 * 유저 다이어리 0번째 포스팅팅 내용
 */
