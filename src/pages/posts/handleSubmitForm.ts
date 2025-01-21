import { createDiaryPost } from "@/services/apis";
import { validatePostsForm } from "@/services/utils";
import { NavigateFunction } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const handleSubmitForm = async (
  e: React.FormEvent<HTMLFormElement>,
  newDiaryData: { diaryId: string; title: string; content: string },
  navigate: NavigateFunction,
) => {
  e.preventDefault();
  const validation = validatePostsForm(newDiaryData);

  if(!validation.valid){
    alert(validation.message);
    return 
  }

  const postId = uuidv4();
  try {
    if (newDiaryData.diaryId) {
      const newPostData = {
        diaryId: newDiaryData.diaryId,
        post: {
          id: postId,
          title: newDiaryData.title,
          content: newDiaryData.content,
          createdAt: new Date().toISOString()
        }
      };
      const result = await createDiaryPost(newPostData);
      if (result) navigate(`/diaries/${newDiaryData.diaryId}`);
    }
  } catch (error) {
    console.error(error);
  }
};
