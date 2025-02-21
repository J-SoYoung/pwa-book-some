import { useSuspenseQuery } from "@tanstack/react-query";

import { PostItems } from "./PostItems";
import { getAllPostsData } from "@/services/apis";

interface PostListsProps {
  diaryId: string;
  isAuthor: boolean;
}
export const PostLists = ({ diaryId, isAuthor }: PostListsProps) => {

  const { data: posts } = useSuspenseQuery({
    queryKey: ["posts", diaryId],
    queryFn: async () => {
      const data = await getAllPostsData(diaryId as string);
      return data;
    }
  });

  return (
    <>
      {posts &&
        posts.map((post) => {
          return (
            <PostItems key={post.postId} post={post} isAuthor={isAuthor} />
          );
        })}
    </>
  );
};
