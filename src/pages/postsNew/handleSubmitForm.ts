import { createNewDiaryPost } from "@/services/apis";
import { NewDiaryDataType, SelectedBookType, UserType } from "@/services/types";
import { validatePostsNewForm } from "@/services/utils";
import { NavigateFunction } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export interface diaryDataType {
  diaryTitle: string;
  todayTitle: string;
  content: string;
}

export const handleSubmitForm = async (
  e: React.FormEvent<HTMLFormElement>,
  diaryData: {
    diaryTitle: string;
    todayTitle: string;
    content: string;
  },
  image: string,
  selectedBook: SelectedBookType,
  user: UserType,
  navigate: NavigateFunction
) => {
  e.preventDefault();
  const validation = validatePostsNewForm(diaryData);

  if (!validation.valid) {
    alert(validation.message);
    return;
  }

  const diaryId = uuidv4();
  const postId = uuidv4();
  try {
    if (selectedBook) {
      const newDiaryData: NewDiaryDataType = {
        books: {
          link: selectedBook.link,
          isbn: selectedBook.isbn,
          author: selectedBook.author,
          title: selectedBook.title,
          image: selectedBook.image,
          description: selectedBook.description
        },
        diaries: {
          diaryId: diaryId,
          diaryTitle: diaryData.diaryTitle,
          diaryImage: image,
          createdAt: new Date().toISOString()
        },
        posts: {
          content: diaryData.content,
          createdAt: new Date().toISOString(),
          diaryId: diaryId,
          postId: postId,
          title: diaryData.todayTitle
        },
        user: user as UserType
      };
      const result = await createNewDiaryPost(newDiaryData);
      if (result) {
        alert(result);
        navigate("/home");
      }
    }
  } catch (error) {
    console.error(error);
    alert("포스팅 작성중 에러가 발생했습니다. 다시 시도해주세요요");
  }
};
