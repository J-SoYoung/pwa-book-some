import { getAllPostsData, getDiaryData, getUserData } from "@/shared/apis/apis";
import { getDataFromFirebase, getKeysFromFirebase } from "@/shared/services/utils";
import { DiariesType, UserType } from "@/shared/types/dataTypes";
import { GetBookWithDiaryPostType, GetOneBookDataType } from "@/shared/types/functionTypes";

// basic data - book
export const getOneBookData: GetOneBookDataType = async (bookId) => {
  const bookData = await getDataFromFirebase(`books/${bookId}`, false);
  if (!bookData) {
    throw new Error(`getOneBookData에러, ${bookId}를 찾을 수 없습니다`);
  }
  return bookData;
};


export const getBookWithDiaryPost: GetBookWithDiaryPostType = async (
  bookId
) => {
  const diaryIds = await getKeysFromFirebase(`books/${bookId}/diaries`);
  const diaryWithPosts = await Promise.all(
    diaryIds.map(async (id) => {
      const diary = (await getDiaryData(id)) as DiariesType;
      const posts = await getAllPostsData(id);
      const firstPost = posts[0];
      const user = (await getUserData(diary.userId)) as UserType;

      return {
        diary: {
          diaryId: diary.diaryId,
          createdAt: diary.createdAt,
          diaryTitle: diary.diaryTitle,
          diaryImage: diary.diaryImage
        },
        post: {
          content: firstPost.content,
          createdAt: firstPost.createdAt,
          title: firstPost.title
        },
        user: {
          userId: user.userId,
          username: user.username,
          avatar: user.avatar
        }
      };
    })
  );
  if (diaryWithPosts.length === 0) {
    throw new Error(`getBookWithDiaryPost, 작성된 다이어리가 없습니다`);
  }
  return diaryWithPosts;
};
