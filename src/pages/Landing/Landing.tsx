import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InstallButton } from "./components/InstallButton";

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
    </>
  );
};
