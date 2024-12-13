import BottomNav from "../navigation/BottomNav";
import DesktopNavbar from "../navigation/DesktopNavbar";
import styles from "./layout.module.css";

import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

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
      <DesktopNavbar />
      <header className={styles.header}>
        <h1>BOOKSOME</h1>
      </header>
      <Outlet /> {/* 현재 라우트의 자식 컴포넌트 렌더링 */}
      <BottomNav />
    </>
  );
}

export default Layout;
