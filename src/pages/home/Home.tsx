import { UserBookSkeleton, UserBooks, RecommededBooks } from "./index";
import { WrapperSuspense } from "@/shared/components";

export const Home = () => {
  return (
    <main>
      <WrapperSuspense fallback={<UserBookSkeleton />}>
        <RecommededBooks title="이 책을 추천합니다" />
        <UserBooks title="다른 유저들은 이런 책을 읽고 있어요!" />
      </WrapperSuspense>
    </main>
  );
};
