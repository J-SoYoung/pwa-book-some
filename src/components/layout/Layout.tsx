import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import styles from "./layout.module.css";
import { BottomNav, ScrollTopButton } from "../navigation";
import { SearchBar, Header } from "./index";
import { ScrollReset } from "./ScrollReset";

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

  const showHeader = ["/postsNew", "/posts"].some((p) => !path.startsWith(p));
  const showSearchBar =
    path === "/" ||
    ["/home", "/detail", "/mybook", "/diaries"].some((p) => path.startsWith(p));

  const showBottomNav =
    path === "/" ||
    ["/home", "/mypage", "/mybook", "/postsNew", "/posts", "/diaries"].some(
      (p) => path.startsWith(p)
    );

  return (
    <>
      <ScrollReset />
      <ScrollTopButton />
      {showHeader && <Header />}
      {showSearchBar && <SearchBar />}
      <div className={styles.AppConatiner}>
        <Outlet />
      </div>
      {showBottomNav && <BottomNav />}
    </>
  );
};

export default Layout;
