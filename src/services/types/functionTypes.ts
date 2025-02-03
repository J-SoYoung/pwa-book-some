import { BookType, DiariesType, PostsType } from "./dataTypes";

export type GetBookDataType = (bookId: string) => Promise<BookType | null>;
export type GetDiaryDataType = (diaryId: string) => Promise<DiariesType | null>;
export type GetPostsDataType = (bookId: string) => Promise<PostsType[] | []>;
