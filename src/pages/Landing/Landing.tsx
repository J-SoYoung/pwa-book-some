import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InstallButton } from "./InstallButton";

export const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // PWA가 설치되어 있는지 확인
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isStandalone) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <>
      <h1>BOOK-SOME landing</h1>
      <InstallButton />
      <Link to='/home'>BOOK-SOME둘러보기</Link>
    </>
  );
};
