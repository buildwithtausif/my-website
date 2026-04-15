import { useEffect } from "react";
import { initSmoothScroll } from "../utils/smoothScroll";

export default function SmoothScrollIsland() {
  useEffect(() => {
    // Initialize the smooth scroll behaviour after component mounts (hydrates)
    const cleanup = initSmoothScroll();
    
    // Cleanup event listeners if the island is unmounted
    return cleanup;
  }, []);

  return null;
}
