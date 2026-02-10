import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;

    const onMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dot) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      const target = e.target;
      const isClickable =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer");

      setIsHovering(!!isClickable);
    };

    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      if (outline) {
        outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      }

      requestAnimationFrame(animateOutline);
    };

    // Event Listeners
    window.addEventListener("mousemove", onMouseMove);
    const animationId = requestAnimationFrame(animateOutline);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  // Sembunyikan di mobile device agar tidak mengganggu
  if (
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
  ) {
    return null;
  }

  return (
    <>
      {/* Dot Utama (Kecil & Solid) */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform
          w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]
          transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }
        `}
      />

      {/* Outline Ring (Besar & Delay) */}
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform
          border border-primary/50 rounded-full transition-all duration-300 ease-out
          ${isVisible ? "opacity-100" : "opacity-0"}
          ${
            isHovering
              ? "w-12 h-12 bg-primary/10 border-primary backdrop-blur-[1px]"
              : "w-8 h-8 bg-transparent"
          }
        `}
      />
    </>
  );
}
