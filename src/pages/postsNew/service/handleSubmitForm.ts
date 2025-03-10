import { NavigateFunction } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { createNewDiaryPost } from "./createFirebaseNewDiaryPost";

import {
  NewDiaryDataType,
  SelectedBookType,
  UserType
} from "@/shared/types/dataTypes";

export interface diaryDataType {
  diaryTitle: string;
  todayTitle: string;
  content: string;
}

export const handleSubmitForm = async (
  selectedBook: SelectedBookType,
  image: string,
  diaryData: diaryDataType,
  user: UserType,
  navigate: NavigateFunction
) => {
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
