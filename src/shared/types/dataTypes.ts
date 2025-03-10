

export interface SelectedBookType {
  author: string;
  description: string;
  image: string;
  isbn: string;
  title: string;
  link: string;
}

export interface BookType extends SelectedBookType {
  diaries: { [key: string]: boolean };
}

export interface PostsType {
  content: string;
  createdAt: string;
  diaryId: string;
  postId: string;
  title: string;
  updatedAt?: string;
}

export interface UserType {
  avatar: string;
  email: string;
  userId: string;
  username: string;
}

export interface DiariesType {
  book: Pick<BookType, "isbn" | "image" | "title">;
  createdAt: string;
  diaryId: string;
  diaryImage: string;
  diaryTitle: string;
  postId: { [key: string]: string };
  userId: UserType["userId"];
}

export interface AllDiariesDataType {
  book: Pick<BookType, "image" | "title">;
  diary: Pick<DiariesType, "diaryTitle" | "diaryImage" | "diaryId">;
  post: Pick<PostsType, "content" | "title" | "postId">;
  user: Pick<UserType, "username"|"avatar" | "userId" >;
}

export type DiaryWithPostsType = {
  diary: Pick<
    DiariesType,
    "diaryTitle" | "diaryImage" | "diaryId" | "createdAt"
  >;
  post: Pick<PostsType, "content" | "createdAt" | "title">;
  user: Pick<UserType, "avatar" | "userId" | "username">;
};

export interface NewDiaryDataType {
  books: SelectedBookType;
  diaries: Pick<
    DiariesType,
    "diaryTitle" | "diaryImage" | "diaryId" | "createdAt"
  >;
  posts: PostsType;
  user: UserType;
}

export type DiaryWithUserType = {
  book: Pick<BookType, "isbn" | "image" | "title">;
  diaryId: string;
  diaryImage: string;
  diaryTitle: string;
  postId: { [key: string]: string };
  user: Pick<UserType, "userId" | "avatar" | "username">;
};
