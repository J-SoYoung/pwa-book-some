import BottomNav from "./bottomNav/BottomNav";
import Header from "./header/Header";
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
      <Header />
      <Outlet /> {/* 현재 라우트의 자식 컴포넌트 렌더링 */}
      <BottomNav />
    </>
  );
}

export default Layout;
