import { useState } from "react";
import styles from "../styles/postItems.module.css";

import { PostsType } from "@/shared/types/dataTypes";
import { PostItemsEditView } from "./PostItemsEditView";

type PostsPropsType = {
  post: PostsType;
  isAuthor: boolean;
}

export const PostItems = ({ post, isAuthor }: PostsPropsType) => {
  const [isEditPost, setIsEditPost] = useState(false);
  const handlePostEdit = () => {
    setIsEditPost(!isEditPost);
  };

  return (
    <div className={styles.postsItems}>
      <div className={styles.details}>
        {!isEditPost ? (
          <>
            <h3>{post.title}</h3>
            <p>{post.createdAt.split("T")[0]}</p>
            <p>{post.content}</p>
            {isAuthor && <button onClick={handlePostEdit}>수정</button>}
          </>
        ) : (
          <PostItemsEditView
            isEditPost={isEditPost}
            setIsEditPost={setIsEditPost}
            post={post}
          />
        )}
      </div>
    </div>
  );
};
