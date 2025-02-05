export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => void;
}

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
  bookIsbn?: BookType["isbn"];
  bookImage: BookType["image"];
  bookTitle: BookType["title"];
  createdAt: string;
  diaryId: string;
  diaryImage: string;
  diaryTitle: string;
  postId: { [key: string]: string };
  userId: UserType["userId"];
}

type DiaryPickType = Pick<
  DiariesType,
  "bookImage" | "bookTitle" | "diaryTitle" | "diaryImage" | "diaryId"
>;
type PostsPickType = Pick<PostsType, "content" | "postId" | "title">;
type UserPickType = Pick<UserType, "avatar" | "userId" | "username">;

export interface AllDiariesType {
  diary: DiaryPickType;
  post: PostsPickType;
  user: UserPickType;
}

export type DiaryWithPostsType = {
  diaryId: string;
  diaryCreatedAt: string;
  diaryTitle: string;
  diaryImage: string;
  userId: string;
  userAvatar: string;
  username: string;
  postContent: string;
  postCreatedAt: Date;
  postTitle: string;
};

export interface NewDiaryDataType {
  books: SelectedBookType;
  diaries: {
    diaryId: string;
    diaryTitle: string;
    diaryImage: string;
    createdAt: string;
  };
  posts: PostsType;
  user: UserType;
}

export type DiaryWithUserType = {
  bookId: string;
  bookImage: string;
  bookTitle: string;
  diaryId: string;
  diaryImage: string;
  diaryTitle: string;
  postId: string;
  userId: string;
  userAvatar: string;
  username: string;
};
