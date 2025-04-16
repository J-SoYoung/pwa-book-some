import { useEffect, useState } from "react";

export const useDeviceType = () => {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">(() => {
    const width = window.innerWidth;
    if (width <= 480) return "mobile";
    else if (width <= 1279) return "tablet";
    else return "desktop";
  });

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      if (width <= 480) setDevice("mobile");
      else if (width <= 1279) setDevice("tablet");
      else setDevice("desktop");
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return {
    deviceType: device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop"
  };
};
