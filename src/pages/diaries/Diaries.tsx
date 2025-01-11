import { useEffect, useState } from "react";
import styles from "./diaries.module.css";
import { getDiaryPosts } from "@/services/apis";
import { useParams } from "react-router-dom";
import { DiariesType, PostsType } from "@/types";

type FetchResultType = {
  postsData: PostsType[];
  diaryData: DiariesType | null;
};

export const Diaries = () => {
  const { diaryId } = useParams<{ diaryId: string }>();

  const [posts, setPosts] = useState<PostsType[]>([]);
  const [diary, setDiary] = useState<DiariesType | null>(null);

  useEffect(() => {
    const fetchPosts = async (diaryId: string) => {
      try {
        const response = await getDiaryPosts(diaryId) as FetchResultType;
        setPosts(response.postsData);
        setDiary(response.diaryData);
      } catch (error) {
        console.error("다이어리 가져오기 에러", error);
      }
    };

    fetchPosts(diaryId as string);
  }, [diaryId]);

  return (
    <main className={styles.diaries}>
      <h2>Diaries</h2>
      <div className={styles.featured}>
        <img src={diary?.bookImage} width={130} />
        <div className={styles.featuredText}>
          <h3 className={styles.featuredDescription}>{diary?.title}</h3>
          <p className={styles.featuredTitle}>{diary?.bookTitle}</p>
        </div>
      </div>
      {posts.map((post) => (
        <div className={styles.bookItem} key={post.id}>
          <div className={styles.thumbnail}></div>
          <div className={styles.details}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </main>
  );
};
