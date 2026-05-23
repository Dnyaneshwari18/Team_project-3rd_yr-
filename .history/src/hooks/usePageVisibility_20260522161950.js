import { useEffect, useState } from "react";

export function usePageVisibility() {
  const [isHidden, setIsHidden] = useState(document.hidden);

  useEffect(() => {
    function handleVisibilityChange() {
      setIsHidden(document.hidden);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return isHidden;
}