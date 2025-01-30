import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { BottomNav, ScrollTopButton } from "../navigation";
import { SearchBar, Header } from "./index";

export const Layout = () => {
  const navigate = useNavigate();

  // app install check, home으로 이동
  useEffect(() => {
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isStandalone) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <>
      <ScrollTopButton />
      {/* <DesktopNavbar /> */}
      <Header />
      <SearchBar />
      <Outlet /> {/* 현재 라우트의 자식 컴포넌트 렌더링 */}
      <BottomNav />
    </>
  );
};

export default Layout;
