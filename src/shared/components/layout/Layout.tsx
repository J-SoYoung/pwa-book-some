import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import styles from "./styles/layout.module.css";
import {
  BottomNav,
  Header,
  SearchBar,
  ScrollReset,
  ScrollTopButton
} from "./components";

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    // app install check, home으로 이동
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isStandalone) {
      navigate("/home");
    }
  }, [navigate]);

  // 글작성 페이지, 내정보를 제외하고 검색바를 보여줌
  const hideSearchBarPaths = ["/postsNew", "/posts", "/mypage", "/landing"];
  const showSearchBar = !hideSearchBarPaths.some((p) => path.startsWith(p));

  // 로그인, 랜딩 페이지를 제외하고 하단 네비게이션을 보여줌
  const hideBottomNavPaths = ["/login"];
  const showBottomNav = !hideBottomNavPaths.some((p) => path.startsWith(p));

  return (
    <>
      <ScrollReset />
      <ScrollTopButton />
      <Header />
      {showSearchBar && <SearchBar />}
      <div className={styles.AppConatiner}>
        <Outlet />
      </div>
      {showBottomNav && <BottomNav />}
    </>
  );
};

export default Layout;
