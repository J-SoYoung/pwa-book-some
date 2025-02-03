import { useEffect, useState } from "react";
import { PostsType } from "@/services/types/dataTypes";
import { getPostsData } from "@/services/apis";
import { PostItems } from "./PostItems";

interface PostListsProps {
  diaryId: string;
  isAuthor: boolean;
}
export const PostLists = ({ diaryId, isAuthor }: PostListsProps) => {
  const [posts, setPosts] = useState<PostsType[]>([]);

  useEffect(() => {
    const fetchPosts = async (diaryId: string) => {
      try {
        const postData = await getPostsData(diaryId as string);
        setPosts(postData);
      } catch (error) {
        console.error("다이어리 가져오기 에러", error);
      }
    };
    fetchPosts(diaryId as string);
  }, [diaryId]);

  return (
    <>
      {posts.map((post) => {
        return (
          <PostItems
            key={post.postId}
            post={post}
            setPosts={setPosts}
            isAuthor={isAuthor}
          />
        );
      })}
    </>
  );
};
