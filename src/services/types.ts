export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => void;
}

export interface BookType {
  author: string;
  description: string;
  diaries: { [key: string]: boolean };
  id: string;
  image: string;
  title: string;
  link: string;
}

export interface SelectedBookType {
  author: string;
  description: string;
  image: string;
  isbn: string;
  title: string;
  link: string;
}

export interface BookDiaryType {
  diaries?: { [key: string]: boolean };
  id: string;
  image: string;
  title: string;
  createdAt: string;
}

export interface DiariesType {
  bookId?: string;
  bookImage: string;
  bookTitle?: string;
  createdAt: string;
  diaryId: string;
  diaryImage: string;
  diaryTitle: string;
  postId: { [key: string]: string };
  userId: string;
}

// ✅타입 정리하기 둘이 합치든지 나누든지....... home diaries 
export interface DiariesWithPostsType {
  diaryId: string;
  diaryTitle: string;
  bookImage: string;
  bookTitle: string;
  posts: PostsType[];
}

export type DiaryWidthPostsType = {
  diaryId: string;
  diaryCreatedAt: Date;
  diaryTitle: string;
  diaryImage: string;
  userId: string;
  userAvatar: string;
  username: string;
  postContent: string;
  postCreatedAt: Date;
  postTitle: string;
};

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
