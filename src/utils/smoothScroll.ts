export const initSmoothScroll = () => {
  const handleAnchorClick = function (this: HTMLAnchorElement, e: MouseEvent) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    const offset = 40;
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;

    const duration = 1000;
    let startTime: number | null = null;

    // easeInOutCubic: Starts slow (heavy drag), accelerates, then drags to a smooth stop
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      let progress = Math.min(timeElapsed / duration, 1);

      progress = easeInOutCubic(progress);
      window.scrollTo(0, startPosition + distance * progress);

      if (timeElapsed < duration) {
        window.requestAnimationFrame(animation);
      } else {
        window.history.pushState(null, "", targetId);
      }
    };

    window.requestAnimationFrame(animation);
  };

  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", handleAnchorClick as EventListener);
  });

  return () => {
    anchors.forEach((anchor) => {
      anchor.removeEventListener("click", handleAnchorClick as EventListener);
    });
  };
};
