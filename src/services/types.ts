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
}

export interface SelectedBookType {
  author: string;
  description: string;
  image: string;
  isbn: string;
  title: string;
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
  bookImage?: string;
  bookTitle?: string;
  id: string;
  title: string;
  createdAt: string;
}

export interface DiariesWithPostsType {
  diaryId: string;
  diaryTitle: string;
  bookImage: string;
  bookTitle: string;
  posts: PostsType[];
}

export interface PostsType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface UserType {
  avatar: string;
  email: string;
  userId: string;
  username: string;
}

export interface NewDiaryDataType {
  books: SelectedBookType;
  diaries: DiariesType;
  posts: PostsType;
  user: UserType;
}
