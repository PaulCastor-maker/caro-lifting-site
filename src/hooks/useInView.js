import { useEffect, useState } from "react";

/**
 * Beobachtet ein DOM-Element und meldet true, sobald es im Viewport sichtbar ist.
 * @param {React.RefObject} ref - ref auf das zu beobachtende Element
 * @param {{threshold?:number, root?:Element|null, rootMargin?:string, once?:boolean}} opts
 */
export default function useInView(ref, { threshold = 0.15, root = null, rootMargin = "0px", once = true } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, root, rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold, root, rootMargin, once]);

  return inView;
}
