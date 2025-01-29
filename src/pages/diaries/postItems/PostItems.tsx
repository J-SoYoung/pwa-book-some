import { useState } from "react";
import styles from "../diaries.module.css";
import { PostsType } from "@/services/types";
import { validateEditPost } from "@/services/utils";
import { updatePosts } from "@/services/apis";
import { InputEditField } from "@/components";

interface PostsPropsType {
  post: PostsType;
  isAuthor: boolean;
  setPosts: React.Dispatch<React.SetStateAction<PostsType[] | []>>;
}
export interface newPostType {
  title: string;
  content: string;
  updatedAt: string;
}

export const PostItems = ({ post, setPosts, isAuthor }: PostsPropsType) => {
  const [isEditPost, setIsEditPost] = useState(false);
  const [editPost, setEditPost] = useState({
    title: post.title,
    content: post.content,
    updatedAt: new Date().toISOString()
  });

  const handleChangePosts = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };
  const handlePostEdit = () => {
    setIsEditPost(!isEditPost);
  };

  const handlePostSave = async () => {
    if (editPost.title === "") editPost.title = post.title;
    if (editPost.content === "") editPost.content = post.content;

    const validate = validateEditPost(editPost);
    if (!validate.valid) return alert(validate.message);

    try {
      const response = await updatePosts({
        editPost: editPost as newPostType,
        postId: post.postId as string
      });
      console.log("response--", response);

      if (response) {
        setPosts((prevPost) =>
          prevPost.map((p) =>
            p.postId === post.postId
              ? { ...p, title: response.title, content: response.content }
              : p
          )
        );

        setIsEditPost(false);
      }
    } catch (error) {
      console.error(error, "포스트 수정 에러");
    }
  };

  return (
    <div className={styles.postsItems}>
      <div className={styles.details}>
        {isEditPost ? (
          <>
            <InputEditField
              defaultValue={post.title}
              name={"title"}
              onChange={handleChangePosts}
              inputType={"input"}
            />
            <InputEditField
              defaultValue={post.content}
              name={"content"}
              onChange={handleChangePosts}
              inputType={"textarea"}
            />
          </>
        ) : (
          <>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </>
        )}
      </div>
      {isAuthor && (
        <div>
          {isEditPost ? (
            <>
              <button onClick={handlePostSave}>저장</button>
              <button onClick={handlePostEdit}>취소</button>
            </>
          ) : (
            <button onClick={handlePostEdit}>수정</button>
          )}
        </div>
      )}
    </div>
  );
};
