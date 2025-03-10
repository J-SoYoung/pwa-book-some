import { ref, set, update } from "firebase/database";
import { database } from "../services/firebase";
import { DiariesType, PostsType } from "@/shared/types/dataTypes";
import { getDataFromFirebase, getKeysFromFirebase } from "../services/utils";
import {
  GetDiaryDataType,
  GetUserDataType,
  GetDiaryListType,
  GetAllPostsDataType
} from "../types/functionTypes";

// basic data - diary
export const getDiaryData: GetDiaryDataType = async (diaryId) => {
  try {
    const diary = await getDataFromFirebase(`diary/${diaryId}`, false);
    if (diary) {
      return diary as DiariesType;
    } else {
      console.error("다이어리가 없습니다");
      return null;
    }
  } catch (error) {
    console.error("getDiaryData 에러", error);
    throw error;
  }
};

// basic data - user
export const getUserData: GetUserDataType = async (userId) => {
  try {
    const user = await getDataFromFirebase(`users/${userId}`, false);
    if (user) {
      return user;
    } else {
      console.error("유저 데이터가 없습니다");
      return null;
    }
  } catch (error) {
    console.error("getUserData 에러", error);
    return null;
  }
};

// basic data - posts
export const getAllPostsData: GetAllPostsDataType = async (diaryId) => {
  try {
    const diary = await getDiaryData(diaryId);
    if (diary === null) {
      return [];
    } else {
      const postIds = Object.keys(diary.postId);
      const posts = await Promise.all(
        postIds.map(async (id) => {
          return await getDataFromFirebase(`posts/${id}`);
        })
      );
      return posts;
    }
  } catch (error) {
    console.error("getAllPostsData 에러", error);
    throw error;
  }
};

// Post 다이어리의 리스트 가져오기
export const getDiaryList: GetDiaryListType = async (userId) => {
  try {
    const userDiaryIds = await getKeysFromFirebase(`users/${userId}/diaries`);
    if (userDiaryIds.length === 0) {
      console.error("No diaries found.");
      return [];
    }
    const diaryData = await Promise.all(
      userDiaryIds.map(async (diaryId) => {
        return await getDiaryData(diaryId);
      })
    );
    return diaryData as DiariesType[];
  } catch (error) {
    console.error("getDiaryList 에러", error);
    return [];
  }
};

// Post 다이어리 포스트 생성
type NewPostData = {
  diaryId: string;
  post: PostsType;
};
export const createDiaryPost = async (newPostData: NewPostData) => {
  try {
    const { diaryId, post } = newPostData;
    // diary에 postId저장
    const diaryRef = ref(database, `diary/${diaryId}/postId`);
    await update(diaryRef, { [post.postId]: true });

    // post저장
    const postsRef = ref(database, `posts/${post.postId}`);
    await set(postsRef, {
      content: post.content,
      createdAt: post.createdAt,
      diaryId: diaryId,
      postId: post.postId,
      title: post.title
    });
    return "포스트가 정상적으로 업로드 되었습니다";
  } catch (error) {
    console.error("uploadDiaryPost 에러 --", error);
  }
};
