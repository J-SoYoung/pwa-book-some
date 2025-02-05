import {
  AllDiariesDataType,
  BookType,
  DiariesType,
  DiaryWithPostsType,
  DiaryWithUserType,
  PostsType,
  UserType
} from "./dataTypes";

export type GetBookDataType = (bookIsbn: string) => Promise<BookType | null>;

export type GetDiaryDataType = (diaryId: string) => Promise<DiariesType | null>;

export type GetPostsDataType = (bookId: string) => Promise<PostsType[] | []>;

export type GetUserDataType = (userId: string) => Promise<UserType | null>;

export type getBookWithDiaryPostType = (
  bookId: string
) => Promise<DiaryWithPostsType[] | []>;

export type GetDiaryWithUserDataType = (
  diaryId: string
) => Promise<DiaryWithUserType | null>;

export type GetAllDiariesType = () => Promise<AllDiariesDataType[] | []>;
