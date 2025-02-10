import { useQuery } from "@tanstack/react-query";

import { PostItems } from "./PostItems";
import { getAllPostsData } from "@/services/apis";

interface PostListsProps {
  diaryId: string;
  isAuthor: boolean;
}
export const PostLists = ({ diaryId, isAuthor }: PostListsProps) => {
  const {
    data: posts,
    isLoading,
    error
  } = useQuery({
    queryKey: ["posts", diaryId],
    queryFn: () => getAllPostsData(diaryId as string),
    enabled: !!diaryId // diaryId가 존재할 때만 실행
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <>
      {posts &&
        posts.map((post) => {
          return (
            <PostItems
              key={post.postId}
              post={post}
              isAuthor={isAuthor}
            />
          );
        })}
    </>
  );
};
