import { useEffect, useState } from "react";

export const useLazyLoading = () => {
  const [lazy, setLazy] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      setLazy(scrollTop + windowHeight >= fullHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return lazy;
};
