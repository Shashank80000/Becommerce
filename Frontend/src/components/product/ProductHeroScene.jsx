import { useEffect, useRef } from "react";
import { categorySlug } from "../../utils/search";
import { Backdrop, Effects, scenes } from "./heroScene/scenes";

// Decorative animated scene behind the catalogue heading. Each category has
// its own composition (heroScene/scenes.jsx); motion lives in index.css under
// "Product hero scene".

export default function ProductHeroScene({ category = "All", className = "" }) {
  const key = category && category !== "All" ? categorySlug(category) : "all";
  const scene = scenes[key] || scenes.all;

  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Stop animating while the hero is scrolled out of view.
    const observer = new IntersectionObserver(([entry]) =>
      node.classList.toggle("is-paused", !entry.isIntersecting),
    );
    observer.observe(node);

    // Gentle mouse parallax, only for mouse/trackpad users who allow motion.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        node.style.setProperty("--mx", x.toFixed(3));
        node.style.setProperty("--my", y.toFixed(3));
      });
    };
    if (finePointer && !reduceMotion) window.addEventListener("pointermove", onMove);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className={`hero-scene ${className}`} ref={ref} aria-hidden="true">
      {/* Keyed so switching category replays the entrance animation. */}
      <svg key={key} className="hs-svg" viewBox="0 0 640 520" role="presentation" focusable="false">
        <Backdrop glow={scene.glow} blob={scene.blob} />
        {scene.content}
        <Effects
          {...(scene.bubbles ? { bubbles: scene.bubbles } : {})}
          {...(scene.sparkles ? { sparkles: scene.sparkles } : {})}
        />
      </svg>
    </div>
  );
}
