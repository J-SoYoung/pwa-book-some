import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PWABadge from "./PWABadge.tsx"; // 서비스워커 업데이트
import { InstallButton } from "./components/InstallButton.tsx"; // pwa로 설치

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // PWA가 설치되어 있는지 확인
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    console.log(window.matchMedia("(display-mode: standalone)"));

    if (isStandalone) {
      // 설치된 상태라면 Home으로 리디렉션
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
}

export default App;
