import { useState, useEffect } from "react";

/**
 * useMediaQuery
 * React hook that subscribes to a CSS media query and returns whether it matches.
 * @param query CSS media query string (e.g., "(max-width: 768px)")
 * @returns boolean - true if the media query matches, false otherwise.
 */
function useMediaQuery(query: string): boolean {
  const getMatches = (q: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== "undefined" && typeof window.matchMedia !== "undefined") {
      return window.matchMedia(q).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(() => getMatches(query));

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const handleChange = () => setMatches(mediaQueryList.matches);

    // Listen for changes
    mediaQueryList.addEventListener
      ? mediaQueryList.addEventListener("change", handleChange)
      : mediaQueryList.addListener(handleChange);

    // Set initial value in case it changed between renders
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mediaQueryList.matches);

    // Cleanup listener on unmount
    return () => {
      mediaQueryList.removeEventListener
        ? mediaQueryList.removeEventListener("change", handleChange)
        : mediaQueryList.removeListener(handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;