import BottomNav from "../navigation/BottomNav";
import DesktopNavbar from "../navigation/DesktopNavbar";
import { ScrollTopButton } from "../navigation/ScrollTopButton";
import styles from "./layout.module.css";

import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useRecoilValue } from "recoil";
import { UserType } from "@/services/types";
import { userState } from "@/recoil/atoms";

function Layout() {
  const navigate = useNavigate();
  const user = useRecoilValue<UserType | null>(userState);

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
      <DesktopNavbar />
      <header className={styles.header}>
        <h1>BOOKSOME</h1>
        <p>{user?.username}님</p>
      </header>
      <SearchBar />
      <Outlet /> {/* 현재 라우트의 자식 컴포넌트 렌더링 */}
      <BottomNav />
    </>
  );
}

export default Layout;
