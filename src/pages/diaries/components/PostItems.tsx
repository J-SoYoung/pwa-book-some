import { useState } from "react";
import styles from "../styles/postItems.module.css";
import DOMPurify from "dompurify";

import { PostsType } from "@/shared/types/dataTypes";
import { PostItemsEditView } from "./PostItemsEditView";

type PostsPropsType = {
  post: PostsType;
  isAuthor: boolean;
};

export const PostItems = ({ post, isAuthor }: PostsPropsType) => {
  const [isEditPost, setIsEditPost] = useState(false);
  const handlePostEdit = () => {
    setIsEditPost(!isEditPost);
  };

  return (
    <article className={styles.article}>
      {!isEditPost ? (
        <div className={styles.details}>
          <h3>{post.title}</h3>
          <p className={styles.date}>{post.createdAt.split("T")[0]}</p>
          <p
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content)
            }}
          />

          {isAuthor && <button onClick={handlePostEdit}>수정</button>}
        </div>
      ) : (
        <PostItemsEditView
          isEditPost={isEditPost}
          setIsEditPost={setIsEditPost}
          post={post}
        />
      )}
    </article>
  );
};
