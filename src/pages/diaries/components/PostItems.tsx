import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "../styles/diaries.module.css";
import { updatePosts } from "../service/updateFirebaseData";

import { PostsType } from "@/shared/types/dataTypes";
import { validateEditPost } from "@/shared/services/utils";
import { InputEditField } from "@/shared/components";

interface PostsPropsType {
  post: PostsType;
  isAuthor: boolean;
}
export interface newPostType {
  title: string;
  content: string;
  updatedAt: string;
}

export const PostItems = ({ post, isAuthor }: PostsPropsType) => {
  const [isEditPost, setIsEditPost] = useState(false);
  const [editPost, setEditPost] = useState({
    title: post.title,
    content: post.content,
    updatedAt: new Date().toISOString()
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatePosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", post.diaryId] });
      setIsEditPost(false);
    },
    onError: (error) => {
      console.error("다이어리 수정 오류:", error);
      alert("다이어리 수정 중 오류가 발생했습니다.");
    }
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

    mutation.mutate({
      editPost: editPost as newPostType,
      postId: post.postId as string
    });
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
            <p>{post.createdAt.split('T')[0]}</p>
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
