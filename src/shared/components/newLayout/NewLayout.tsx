import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./newLayout.module.css";

import { Header, Sidebar, Categories, BottomNavbar } from "./components";
import { useDeviceType, useScrollReset } from "./hooks/";

export const NewLayout = () => {
  const navigate = useNavigate();
  useScrollReset();

  useEffect(() => {
    // app install check, home으로 이동
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isStandalone) {
      navigate("/home");
    }
  }, [navigate]);

  const { isTablet, isDesktop } = useDeviceType();
  if (isDesktop) {
    return (
      <div className={styles.desktop__layout}>
        <Sidebar />
        <section className={styles.desktop__contents}>
          <Header />
          <Outlet />
        </section>
      </div>
    );
  }

  if (isTablet) {
    return (
      <section className={styles.tablet__contents}>
        <Header />
        <Categories />
        <Outlet />
      </section>
    );
  }

  return (
    <div className={styles.mobile__contents}>
      <section>
        <Header />
        <Categories />
        <Outlet />
      </section>
      <BottomNavbar />
    </div>
  );
};
