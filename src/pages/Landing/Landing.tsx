import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { InstallButton } from "@/components/InstallButton.tsx"; // pwa로 설치
import PWABadge from "../../PWABadge"; // 서비스워커 업데이트

// 랜딩페이지
export const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // PWA가 설치되어 있는지 확인
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    console.log(window.matchMedia("(display-mode: standalone)"));

    if (isStandalone) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <>
      <h1>BOOK-SOME landing</h1>
      <InstallButton />
      <PWABadge />
    </>
  );
};
