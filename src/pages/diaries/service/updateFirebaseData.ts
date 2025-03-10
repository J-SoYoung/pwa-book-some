import { database } from "@/shared/services/firebase";
import { ref, update } from "firebase/database";
import { newPostType } from "../components/PostItems";

// 다이어리 수정
export const updateDiary = async ({
  diaryId,
  newTitle
}: {
  diaryId: string;
  newTitle: string;
}) => {
  try {
    const diaryRef = ref(database, `diary/${diaryId}`);
    const updates = { diaryTitle: newTitle };
    update(diaryRef, updates);
    return { diaryId, diaryTitle: newTitle };
  } catch (error) {
    console.error(error, "다이어리 제목 수정 에러");
    return {};
  }
};

// 포스트 수정
interface updatePostsType {
  editPost: newPostType;
  postId: string;
}
export const updatePosts = async ({ editPost, postId }: updatePostsType) => {
  try {
    const { title, content, updatedAt } = editPost;
    const postRef = ref(database, `posts/${postId}`);
    const updates = { content, title, updatedAt };
    update(postRef, updates);
    return { postId, title, content };
  } catch (error) {
    console.error(error, "포스트 수정 에러");
    return null;
  }
};
