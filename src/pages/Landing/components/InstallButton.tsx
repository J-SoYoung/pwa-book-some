import { BeforeInstallPromptEvent } from "../types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const InstallButton = () => {
  const navigate = useNavigate();
  // const [isInstallApp, setIsInstallApp] = useState(null)

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // 설치 팝업 표시
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA install");
        navigate("/home");
      } else {
        console.log("User dismissed the PWA install");
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <div>
      <button onClick={handleInstall} disabled={!deferredPrompt}>
        install App
      </button>
    </div>
  );
};
