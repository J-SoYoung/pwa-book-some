import { PostsType } from "@/services/types";
import styles from "../diaries.module.css";

export const PostItems = ({ posts }: { posts: PostsType[] }) => {
  return (
    <>
      {posts.map((post) => (
        <div className={styles.postsItems} key={post.id}>
          <div className={styles.thumbnail}></div>
          <div className={styles.details}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};
