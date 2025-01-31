import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styles from "./diaries.module.css";

import { PostItems } from "./components/PostItems";
import { DiaryItem } from "./components/DiaryItem";

import { getDiaryPosts } from "@/services/apis";
import { DiariesType, PostsType } from "@/services/types";
import { userState } from "@/recoil/atoms";

type FetchResultType = {
  postsData: PostsType[];
  diaryData: DiariesType | null;
};

export const Diaries = () => {
  const { diaryId } = useParams<{ diaryId: string }>();

  const users = useRecoilValue(userState);
  const [posts, setPosts] = useState<PostsType[]>([]);
  const [diary, setDiary] = useState<DiariesType | null>(null);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchPosts = async (diaryId: string) => {
      try {
        const response = (await getDiaryPosts(diaryId)) as FetchResultType;
        setPosts(response.postsData);
        setDiary(response.diaryData);
      } catch (error) {
        console.error("다이어리 가져오기 에러", error);
      }
    };
    if (diary?.userId === users?.userId) setIsAuthor(true);

    console.log(diary);
    fetchPosts(diaryId as string);
  }, [diaryId, users?.userId, diary?.userId]);

  return (
    <main className={styles.diariesContainer}>
      <h2>Diaries</h2>
      <DiaryItem diary={diary} setDiary={setDiary} isAuthor={isAuthor} />

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
    </main>
  );
};
