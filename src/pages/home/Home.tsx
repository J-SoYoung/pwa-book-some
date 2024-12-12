import Recommendations from "./recommendbooks/RecommedBooks";
import UserBooks from "./userBooks/UserBooks";

export const Home = () => {
  return (
    <main>
      <Recommendations />
      <UserBooks />
    </main>
  );
};
