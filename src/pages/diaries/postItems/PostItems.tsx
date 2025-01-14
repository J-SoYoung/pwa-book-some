import { PostsType } from "@/services/types";
import styles from "../diaries.module.css";

export const PostItems = ({ posts }: { posts: PostsType[] }) => {
  return (
    <>
      {posts.map((post, idx) => {
        return (
          <div className={styles.postsItems} key={idx}>
            <div className={styles.thumbnail}></div>
            <div className={styles.details}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          </div>
        )
      })}
    </>
  );
};
