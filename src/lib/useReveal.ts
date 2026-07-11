import { useState } from "react";

export const spring = "cubic-bezier(0.16,1,0.3,1)";

export function useReveal() {
  const [revealed, setRevealed] = useState(false);

  const ref = (node: HTMLElement | null) => {
    if (!node) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setRevealed(true);
        o.disconnect();
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    o.observe(node);
  };

  return [ref, revealed] as const;
}
