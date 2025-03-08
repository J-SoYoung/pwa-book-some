import { UserBookSkeleton, UserBooks, RecommededBooks } from "./components";
import { ItemsSkeleton } from "@/components/items";
import { WrapperSuspense } from "@/components/ErrorComp/WrapperSuspense";

export const Home = () => {
  return (
    <>
      <WrapperSuspense title="이 책을 추천합니다" fallback={<ItemsSkeleton />}>
        <RecommededBooks />
      </WrapperSuspense>
      <WrapperSuspense
        title="다른 유저들은 이런 책을 읽고 있어요!"
        fallback={<UserBookSkeleton />}
      >
        <UserBooks />
      </WrapperSuspense>
    </>
  );
};
