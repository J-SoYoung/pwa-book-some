import { createDiaryPost } from "@/shared/apis/apis";
import { NavigateFunction } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const handleSubmitForm = async (
  data: { diaryId: string; title: string; content: string },
  navigate: NavigateFunction
) => {
  const postId = uuidv4();
  const { diaryId, title, content } = data;
  try {
    if (diaryId) {
      const newPostData = {
        diaryId: diaryId,
        post: {
          createdAt: new Date().toISOString(),
          content: content,
          diaryId: diaryId,
          postId: postId,
          title: title
        }
      };
      const result = await createDiaryPost(newPostData);
      if (result) {
        alert(result);
        navigate(`/diaries/${diaryId}`);
      }
    }
  } catch (error) {
    console.error(error);
    alert("포스팅 작성중 에러가 발생했습니다. 다시 시도해주세요");
  }
};
